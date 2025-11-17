(function () {
  const hasDayConfig = Array.isArray(window.TASK_DAYS) && window.TASK_DAYS.length;
  const rawDays = hasDayConfig
    ? window.TASK_DAYS
    : [
        {
          id: 'default',
          label: 'Все задания',
          title: 'Все задания',
          description: '',
          tasks: Array.isArray(window.TASKS) ? window.TASKS : [],
        },
      ];

  const days = rawDays.map((day) => ({
    id: day.id,
    label: day.label || day.title || day.id,
    title: day.title || day.label || day.id,
    description: day.description || '',
    tasks: (day.tasks || []).map((task) => ({ ...task, dayId: task.dayId || day.id })),
  }));

  const allTasks = days.flatMap((day) => day.tasks);
  const STORAGE_KEY = 'ms-sql-practice-progress';

  const state = {
    SQL: null,
    db: null,
    baseBytes: null,
    days,
    allTasks,
    tasks: days[0] ? days[0].tasks : [],
    currentDayId: days[0] ? days[0].id : null,
    currentTaskId: null,
    progress: {},
    expectedCache: {},
  };

  const elements = {};

  document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    if (!state.allTasks.length) {
      displayFatalError('Не удалось загрузить список заданий. Проверьте файл tasks.js.');
      return;
    }
    bootstrap().catch((error) => {
      console.error(error);
      displayFatalError('Произошла критическая ошибка при инициализации приложения.');
    });
  });

  function cacheElements() {
    elements.taskList = document.getElementById('task-list');
    elements.daySwitcher = document.getElementById('day-switcher');
    elements.statTotal = document.getElementById('stat-total');
    elements.statComplete = document.getElementById('stat-complete');
    elements.statScore = document.getElementById('stat-score');
    elements.resetButton = document.getElementById('reset-progress');
    elements.taskNumber = document.getElementById('task-number');
    elements.taskTitle = document.getElementById('task-title');
    elements.taskDescription = document.getElementById('task-description');
    elements.sqlInput = document.getElementById('sql-input');
    elements.runButton = document.getElementById('run-sql');
    elements.showSolutionButton = document.getElementById('show-solution');
    elements.statusIndicator = document.getElementById('status-indicator');
    elements.feedback = document.getElementById('feedback');
    elements.scoreBreakdown = document.getElementById('score-breakdown');
    elements.userResult = document.getElementById('user-result');
    elements.expectedResult = document.getElementById('expected-result');
    elements.solutionPanel = document.getElementById('solution-panel');
    elements.solutionSql = document.getElementById('solution-sql');
    elements.attemptInfo = document.getElementById('attempt-info');
    elements.bestScore = document.getElementById('best-score');
  }

  function decodeBase64ToBytes(base64) {
    const normalized = (base64 || '').replace(/\s+/g, '');
    if (!normalized) {
      throw new Error('Пустая строка Base64 для базы данных.');
    }
    const binaryString = atob(normalized);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let index = 0; index < length; index += 1) {
      bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
  }

  async function bootstrap() {
    elements.statTotal.textContent = state.allTasks.length.toString();
    loadProgress();
    renderStats();
    renderDayTabs();
    renderTaskList();
    attachEventListeners();

    setStatus('Загрузка sql.js…', 'status-warning');
    state.SQL = await initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
    });

    setStatus('Загрузка базы данных…', 'status-warning');
    await loadDatabase();
    setStatus('База данных загружена', 'status-success');

    const firstTask = state.tasks[0];
    if (firstTask) {
      selectTask(firstTask.id);
    }
  }

  function attachEventListeners() {
    if (elements.daySwitcher) {
      elements.daySwitcher.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-day-id]');
        if (!button) return;
        selectDay(button.dataset.dayId);
      });
    }

    elements.taskList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-task-id]');
      if (!button) return;
      const taskId = button.dataset.taskId;
      if (taskId && taskId !== state.currentTaskId) {
        selectTask(taskId);
      }
    });

    elements.runButton.addEventListener('click', () => {
      runCurrentTask();
    });

    elements.sqlInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        runCurrentTask();
      }
    });

    elements.showSolutionButton.addEventListener('click', () => {
      toggleSolution(true);
    });

    elements.resetButton.addEventListener('click', () => {
      resetProgress();
    });

  }

  async function loadDatabase() {
    if (typeof window !== 'undefined' && window.SAMPLE_DB_BASE64) {
      state.baseBytes = decodeBase64ToBytes(window.SAMPLE_DB_BASE64);
      state.db = new state.SQL.Database(state.baseBytes.slice());
      return;
    }

    const response = await fetch('db/sample.db');
    if (!response.ok) {
      throw new Error('Не удалось загрузить sample.db');
    }
    const buffer = await response.arrayBuffer();
    state.baseBytes = new Uint8Array(buffer);
    state.db = new state.SQL.Database(state.baseBytes.slice());
  }

  function resetDatabase() {
    if (state.db) {
      try {
        state.db.close();
      } catch (error) {
        console.warn('Не удалось корректно закрыть базу данных', error);
      }
    }
    state.db = new state.SQL.Database(state.baseBytes.slice());
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (typeof data === 'object' && data) {
          state.progress = data;
        }
      }
    } catch (error) {
      console.warn('Не удалось загрузить прогресс из localStorage', error);
      state.progress = {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch (error) {
      console.warn('Не удалось сохранить прогресс', error);
    }
  }

  function renderTaskList() {
    elements.taskList.innerHTML = '';
    if (!state.tasks.length) {
      const empty = document.createElement('li');
      empty.className = 'task-list__empty';
      empty.textContent = 'Для выбранного дня нет заданий.';
      elements.taskList.appendChild(empty);
      return;
    }

    state.tasks.forEach((task, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'task-list__item';
      button.dataset.taskId = task.id;
      if (task.id === state.currentTaskId) {
        button.classList.add('task-list__item--active');
      }

      const progress = state.progress[task.id] || { attempts: 0, bestScore: 0 };
      const icon = progress.bestScore >= 4 ? '✅' : progress.bestScore > 0 ? '🟡' : '⬜️';
      const bestText = progress.bestScore ? `${progress.bestScore} / 4` : '0 / 4';

      button.innerHTML = `
        <div class="task-list__title">
          <span>Задание ${index + 1}</span>
          <span>${escapeHtml(task.title)}</span>
        </div>
        <div class="task-list__score">${icon} ${bestText}</div>
      `;

      item.appendChild(button);
      elements.taskList.appendChild(item);
    });
  }

  function selectDay(dayId) {
    if (state.currentDayId === dayId) return;
    const day = state.days.find((item) => item.id === dayId);
    if (!day) return;
    state.currentDayId = dayId;
    state.tasks = day.tasks;
    state.currentTaskId = null;
    renderDayTabs();
    renderTaskList();
    renderStats();
    if (state.tasks.length) {
      selectTask(state.tasks[0].id);
    } else {
      clearTaskContext();
    }
  }

  function renderDayTabs() {
    if (!elements.daySwitcher) return;
    if (state.days.length <= 1) {
      elements.daySwitcher.classList.add('hidden');
      elements.daySwitcher.innerHTML = '';
      return;
    }

    elements.daySwitcher.classList.remove('hidden');
    elements.daySwitcher.innerHTML = state.days
      .map((day) => {
        const activeClass = day.id === state.currentDayId ? 'day-switcher__button--active' : '';
        return `
          <button type="button" class="day-switcher__button ${activeClass}" data-day-id="${day.id}">
            ${escapeHtml(day.label || day.title)}
          </button>
        `;
      })
      .join('');
  }

  function clearTaskContext() {
    elements.taskNumber.textContent = 'Задание';
    elements.taskTitle.textContent = '';
    elements.taskDescription.innerHTML = '';
    elements.sqlInput.value = '';
    elements.feedback.textContent = '';
    elements.scoreBreakdown.innerHTML = '';
    clearResultTables();
    setStatus('Выберите задание', 'status-warning');
    elements.solutionPanel.classList.add('hidden');
    elements.solutionSql.textContent = '';
    elements.showSolutionButton.disabled = true;
    elements.attemptInfo.textContent = '';
    elements.bestScore.textContent = '';
  }

  function selectTask(taskId) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return;

    state.currentTaskId = taskId;
    renderTaskList();

    const day = state.days.find((item) => item.id === task.dayId);
    const dayTasks = day ? day.tasks : state.tasks;
    const index = dayTasks.findIndex((item) => item.id === taskId);
    const dayPrefix = day ? `${day.label || day.title} · ` : '';
    elements.taskNumber.textContent = `${dayPrefix}Задание ${index + 1}`;
    elements.taskTitle.textContent = task.title;
    elements.taskDescription.innerHTML = task.description;

    const progress = getProgress(taskId);
    elements.sqlInput.value = progress.lastSql ?? task.starterSql ?? '';
    elements.sqlInput.focus();

    elements.feedback.textContent = '';
    elements.scoreBreakdown.innerHTML = '';
    clearResultTables();
    setStatus('Готово к проверке', 'status-success');
    toggleSolution(false);

    updateAttemptInfo(taskId);
    updateBestScore(taskId);
    updateSolutionButton(taskId);
  }

  function updateAttemptInfo(taskId) {
    const progress = getProgress(taskId);
    const attempts = progress.attempts || 0;
    elements.attemptInfo.textContent = `Попыток: ${attempts}`;
  }

  function updateBestScore(taskId) {
    const best = getProgress(taskId).bestScore || 0;
    elements.bestScore.textContent = `Лучший результат: ${best} / 4`; 
  }

  function updateSolutionButton(taskId) {
    const progress = getProgress(taskId);
    const canShow = progress.attempts >= 3 || progress.solutionRevealed;
    elements.showSolutionButton.disabled = !canShow;
  }

  function clearResultTables() {
    renderTable(elements.userResult, null);
    renderTable(elements.expectedResult, null);
  }

  function getProgress(taskId) {
    if (!state.progress[taskId]) {
      state.progress[taskId] = {
        attempts: 0,
        bestScore: 0,
        lastSql: '',
        solutionRevealed: false,
      };
    }
    return state.progress[taskId];
  }

  async function runCurrentTask() {
    if (!state.db) {
      setStatus('База данных еще не готова', 'status-warning');
      return;
    }

    const task = state.tasks.find((item) => item.id === state.currentTaskId);
    if (!task) return;

    const sql = elements.sqlInput.value.trim();
    const progress = getProgress(task.id);
    progress.attempts += 1;
    progress.lastSql = sql;
    saveProgress();
    updateAttemptInfo(task.id);
    updateSolutionButton(task.id);

    if (!sql) {
      setStatus('Введите SQL-запрос', 'status-warning');
      elements.feedback.innerHTML = '❌ Запрос не должен быть пустым.';
      renderScore({ execution: 0, structure: 0, data: 0, total: 0 });
      return;
    }

    setStatus('Выполнение запроса…', 'status-warning');

    const execution = executeUserSql(sql);

    let expectedResult = null;
    if (task.referenceSql) {
      expectedResult = await getExpectedResult(task);
    }

    const evaluation = await evaluateTask(task, execution, expectedResult);

    const score = computeScore(execution.success, evaluation.structureMatch, evaluation.dataMatch);
    progress.bestScore = Math.max(progress.bestScore || 0, score);
    saveProgress();

    renderTaskList();
    renderStats();

    renderEvaluation(task, execution, evaluation, score);
  }

  function executeUserSql(rawSql) {
    const processedSql = preprocessSql(rawSql);
    if (!processedSql.trim()) {
      return { success: false, error: new Error('После преобразований запрос пуст.'), result: null };
    }

    try {
      const execResult = state.db.exec(processedSql);
      const result = extractLastResult(execResult);
      return { success: true, result, execResult, sql: processedSql };
    } catch (error) {
      return { success: false, error, result: null };
    }
  }

  async function evaluateTask(task, execution, expectedResult) {
    const evaluation = {
      structureMatch: false,
      dataMatch: false,
      messages: [],
      expectedResult,
      userResult: execution.result,
    };

    if (!execution.success) {
      evaluation.messages.push(`Ошибка выполнения: ${execution.error.message || execution.error}`);
      return evaluation;
    }

    if (task.verification && task.verification.type === 'viewColumn') {
      const result = evaluateViewColumns(task.verification, execution.sql);
      evaluation.structureMatch = result.structureMatch;
      evaluation.dataMatch = result.dataMatch;
      evaluation.messages.push(...result.messages);
      evaluation.expectedResult = result.expectedResult;
      evaluation.userResult = result.userResult;
      return evaluation;
    }

    if (!execution.result) {
      evaluation.messages.push('Запрос не вернул результирующий набор данных.');
      return evaluation;
    }

    if (!expectedResult) {
      evaluation.messages.push('Не найден эталонный результат для сравнения.');
      return evaluation;
    }

    const comparison = compareResultSets(execution.result, expectedResult, task.comparison);
    evaluation.structureMatch = comparison.structure;
    evaluation.dataMatch = comparison.values;
    evaluation.messages.push(...comparison.messages);
    return evaluation;
  }

  function evaluateViewColumns(config) {
    const messages = [];
    let structureMatch = true;
    let dataMatch = true;
    const expectedRows = [];
    const actualRows = [];

    config.checks.forEach((check) => {
      const viewName = mapIdentifier(check.view);
      try {
        const info = state.db.exec(`PRAGMA table_info(${viewName})`);
        const columns = info[0]?.values?.map((row) => String(row[1]).toLowerCase()) || [];
        if (!columns.includes(check.column.toLowerCase())) {
          structureMatch = false;
          dataMatch = false;
          messages.push(`В представлении <code>${escapeHtml(check.view)}</code> не найдена колонка <code>${escapeHtml(check.column)}</code>.`);
          return;
        }

        const actual = state.db.exec(`SELECT ${check.column} FROM ${viewName} ORDER BY ${check.column}`);
        const resultSet = extractLastResult(actual);
        if (!resultSet) {
          structureMatch = false;
          dataMatch = false;
          messages.push(`Не удалось получить данные из <code>${escapeHtml(check.view)}</code>.`);
          return;
        }
        const values = resultSet.values.map((row) => row[0]);
        const expectedValues = Array.isArray(check.expectedValues) ? check.expectedValues : [];

        expectedValues.forEach((value) => {
          expectedRows.push([check.view, value]);
        });
        values.forEach((value) => {
          actualRows.push([check.view, value]);
        });

        if (values.length !== expectedValues.length || !values.every((value, idx) => value === expectedValues[idx])) {
          dataMatch = false;
          messages.push(`Данные колонки <code>${escapeHtml(check.column)}</code> в представлении <code>${escapeHtml(check.view)}</code> не совпадают с ожидаемыми.`);
        }
      } catch (error) {
        structureMatch = false;
        dataMatch = false;
        messages.push(`Ошибка при проверке представления <code>${escapeHtml(check.view)}</code>: ${escapeHtml(error.message || String(error))}`);
      }
    });

    const expectedResult = {
      columns: ['View', 'CustomerID'],
      values: expectedRows,
    };
    const userResult = {
      columns: ['View', 'CustomerID'],
      values: actualRows,
    };

    if (!messages.length && structureMatch && dataMatch) {
      messages.push('Представления успешно обновлены и содержат нужные значения CustomerID.');
    }

    return {
      structureMatch,
      dataMatch,
      messages,
      expectedResult,
      userResult,
    };
  }

  function extractLastResult(execResult) {
    if (!Array.isArray(execResult) || execResult.length === 0) return null;
    const last = execResult[execResult.length - 1];
    if (!last || !last.columns) return null;
    return {
      columns: last.columns,
      values: last.values || [],
    };
  }

  function computeScore(executionSuccess, structureMatch, dataMatch) {
    let total = 0;
    if (executionSuccess) total += 1;
    if (structureMatch) total += 1;
    if (dataMatch) total += 2;
    return total;
  }

  function renderEvaluation(task, execution, evaluation, score) {
    const executionSuccess = execution.success;
    const total = score;
    const structurePoints = evaluation.structureMatch ? 1 : 0;
    const dataPoints = evaluation.dataMatch ? 2 : 0;

    renderScore({
      execution: executionSuccess ? 1 : 0,
      structure: structurePoints,
      data: dataPoints,
      total,
    });

    let message = '';
    let statusClass = 'status-warning';

    if (!executionSuccess) {
      message = `❌ Ошибка выполнения: ${escapeHtml(evaluation.messages[0] || execution.error.message || String(execution.error))}`;
      statusClass = 'status-error';
    } else if (evaluation.structureMatch && evaluation.dataMatch) {
      message = '✅ Отлично! Результат полностью совпал с эталоном.';
      statusClass = 'status-success';
    } else if (!evaluation.structureMatch) {
      message = '⚠️ Структура результата отличается от ожидаемой.';
    } else {
      message = '⚠️ Данные результата не совпадают с эталоном.';
    }

    elements.feedback.innerHTML = message;
    setStatus(message.replace(/^[^ ]+ /, ''), statusClass);

    const detailMessages = (evaluation.messages || [])
      .map((msg) => (typeof msg === 'string' ? msg : String(msg)))
      .filter((msg) => msg && !message.includes(msg));
    if (detailMessages.length) {
      const details = document.createElement('div');
      detailMessages.forEach((msg) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = msg;
        details.appendChild(paragraph);
      });
      elements.feedback.appendChild(details);
    }

    const userResult = evaluation.userResult || execution.result;
    renderTable(elements.userResult, userResult);

    const expectedResult = evaluation.expectedResult || null;
    renderTable(elements.expectedResult, expectedResult);
  }

  function renderScore({ execution, structure, data, total }) {
    elements.scoreBreakdown.innerHTML = `
      <div class="score__item">
        <span>Выполнение</span>
        <strong>${execution} / 1</strong>
      </div>
      <div class="score__item">
        <span>Структура</span>
        <strong>${structure} / 1</strong>
      </div>
      <div class="score__item">
        <span>Данные</span>
        <strong>${data} / 2</strong>
      </div>
      <div class="score__item">
        <span>Итого</span>
        <strong>${total} / 4</strong>
      </div>
    `;
  }

  function renderTable(container, result) {
    if (!result || !result.columns || !Array.isArray(result.columns)) {
      container.classList.add('empty');
      container.innerHTML = 'Нет данных';
      return;
    }

    container.classList.remove('empty');

    const headers = result.columns.map((column) => `<th>${escapeHtml(String(column))}</th>`).join('');
    const rows = result.values
      .map((row) => `<tr>${row.map((value) => `<td>${escapeHtml(formatValue(value))}</td>`).join('')}</tr>`)
      .join('');

    container.innerHTML = `
      <table>
        <thead><tr>${headers}</tr></thead>
        <tbody>${rows || '<tr><td colspan="' + result.columns.length + '">Нет строк</td></tr>'}</tbody>
      </table>
    `;
  }

  function renderStats() {
    let totalScore = 0;
    let completed = 0;
    state.allTasks.forEach((task) => {
      const progress = state.progress[task.id];
      if (!progress) return;
      totalScore += progress.bestScore || 0;
      if ((progress.bestScore || 0) >= 4) {
        completed += 1;
      }
    });
    elements.statScore.textContent = totalScore.toString();
    elements.statComplete.textContent = completed.toString();
  }

  function toggleSolution(show) {
    if (!state.currentTaskId) return;
    const task = state.tasks.find((item) => item.id === state.currentTaskId);
    if (!task || !task.solutionSql) return;

    if (show) {
      elements.solutionSql.textContent = task.solutionSql;
      elements.solutionPanel.classList.remove('hidden');
      const progress = getProgress(task.id);
      progress.solutionRevealed = true;
      elements.showSolutionButton.disabled = false;
      saveProgress();
    } else {
      elements.solutionPanel.classList.add('hidden');
      elements.solutionSql.textContent = '';
    }
  }

  function resetProgress() {
    if (!confirm('Сбросить прогресс и вернуть базу данных в исходное состояние?')) {
      return;
    }
    state.progress = {};
    state.expectedCache = {};
    saveProgress();
    resetDatabase();
    renderTaskList();
    renderStats();
    if (state.currentTaskId) {
      selectTask(state.currentTaskId);
    }
  }

  function getExpectedResult(task) {
    if (state.expectedCache[task.id]) {
      return state.expectedCache[task.id];
    }
    const referenceDb = new state.SQL.Database(state.baseBytes.slice());
    const sql = preprocessSql(task.referenceSql);
    const exec = referenceDb.exec(sql);
    referenceDb.close();
    const result = extractLastResult(exec);
    state.expectedCache[task.id] = result;
    return result;
  }

  function compareResultSets(userResult, expectedResult, options = {}) {
    const messages = [];
    const structure = compareStructure(userResult, expectedResult, messages);
    if (!structure) {
      return { structure: false, values: false, messages };
    }

    const unordered = Boolean(options.unordered);
    const tolerance = typeof options.numericTolerance === 'number' ? options.numericTolerance : 1e-6;

    const userRows = userResult.values.map((row) => normalizeRow(row));
    const expectedRows = expectedResult.values.map((row) => normalizeRow(row));

    if (unordered) {
      userRows.sort(rowComparator);
      expectedRows.sort(rowComparator);
    }

    if (userRows.length !== expectedRows.length) {
      messages.push(`Количество строк не совпадает: получено ${escapeHtml(userRows.length)}, ожидается ${escapeHtml(expectedRows.length)}.`);
      return { structure: true, values: false, messages };
    }

    for (let i = 0; i < expectedRows.length; i += 1) {
      const expectedRow = expectedRows[i];
      const userRow = userRows[i];
      for (let j = 0; j < expectedRow.length; j += 1) {
        if (!valuesEqual(userRow[j], expectedRow[j], tolerance)) {
          messages.push(`Несовпадение данных в строке ${i + 1}, колонке <code>${escapeHtml(userResult.columns[j])}</code>: получено ${escapeHtml(formatValue(userRow[j]))}, ожидается ${escapeHtml(formatValue(expectedRow[j]))}.`);
          return { structure: true, values: false, messages };
        }
      }
    }

    messages.push('Результат совпадает с эталоном.');
    return { structure: true, values: true, messages };
  }

  function compareStructure(userResult, expectedResult, messages) {
    if (!userResult || !expectedResult) {
      messages.push('Не удалось получить результаты для сравнения.');
      return false;
    }

    if (userResult.columns.length !== expectedResult.columns.length) {
      messages.push(`Ожидалось ${expectedResult.columns.length} колонок, получено ${userResult.columns.length}.`);
      return false;
    }

    for (let i = 0; i < expectedResult.columns.length; i += 1) {
      const expectedName = String(expectedResult.columns[i]).toLowerCase();
      const actualName = String(userResult.columns[i]).toLowerCase();
      if (expectedName !== actualName) {
        messages.push(`Название колонки №${i + 1} отличается: ожидается <code>${escapeHtml(expectedResult.columns[i])}</code>, получено <code>${escapeHtml(userResult.columns[i])}</code>.`);
        return false;
      }
    }
    return true;
  }

  function normalizeRow(row) {
    return row.map((value) => {
      if (value === null || value === undefined) return null;
      if (typeof value === 'number') return Number(value);
      return String(value);
    });
  }

  function rowComparator(a, b) {
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i += 1) {
      const av = a[i];
      const bv = b[i];
      if (av === bv) continue;
      if (av === null) return -1;
      if (bv === null) return 1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return av - bv;
      }
      return String(av).localeCompare(String(bv), 'ru');
    }
    return 0;
  }

  function valuesEqual(actual, expected, tolerance) {
    if (actual === null || expected === null) {
      return actual === expected;
    }
    if (typeof actual === 'number' && typeof expected === 'number') {
      return Math.abs(actual - expected) <= tolerance;
    }
    return String(actual) === String(expected);
  }

  function preprocessSql(sql) {
    let text = sql.replace(/\r\n/g, ';\n');
    text = text.replace(/^\s*GO\s*$/gim, ';');
    text = text.replace(/\[([^\]]+)\]/g, '$1');

    const statements = splitStatements(text);
    const transformed = [];
    statements.forEach((statement) => {
      const outputs = transformStatement(statement);
      outputs.forEach((item) => {
        if (item.trim()) {
          transformed.push(item.trim());
        }
      });
    });

    return transformed.join('; ');
  }

  function splitStatements(sql) {
    const statements = [];
    let current = '';
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < sql.length; i += 1) {
      const char = sql[i];
      const next = sql[i + 1];

      if (char === "'" && !inDouble) {
        current += char;
        if (inSingle && next === "'") {
          current += next;
          i += 1;
        } else {
          inSingle = !inSingle;
        }
        continue;
      }

      if (char === '"' && !inSingle) {
        current += char;
        if (inDouble && next === '"') {
          current += next;
          i += 1;
        } else {
          inDouble = !inDouble;
        }
        continue;
      }

      if (char === ';' && !inSingle && !inDouble) {
        if (current.trim()) {
          statements.push(current.trim());
        }
        current = '';
        continue;
      }

      current += char;
    }

    if (current.trim()) {
      statements.push(current.trim());
    }

    return statements;
  }

  function transformStatement(statement) {
    const trimmed = statement.trim();
    if (!trimmed) return [];

    if (/^ALTER\s+VIEW/i.test(trimmed)) {
      const match = trimmed.match(/^ALTER\s+VIEW\s+([^\s]+)\s+AS\s+([\s\S]+)$/i);
      if (match) {
        const viewName = mapIdentifier(match[1]);
        const body = adaptFunctions(normalizeIdentifiers(convertTop(match[2])));
        return [`DROP VIEW IF EXISTS ${viewName}`, `CREATE VIEW ${viewName} AS ${body}`];
      }
    }

    if (/^CREATE\s+VIEW/i.test(trimmed)) {
      const match = trimmed.match(/^CREATE\s+VIEW\s+([^\s]+)\s+AS\s+([\s\S]+)$/i);
      if (match) {
        const viewName = mapIdentifier(match[1]);
        const body = adaptFunctions(normalizeIdentifiers(convertTop(match[2])));
        return [`CREATE VIEW ${viewName} AS ${body}`];
      }
    }

    if (/^DROP\s+VIEW/i.test(trimmed)) {
      const match = trimmed.match(/^DROP\s+VIEW\s+(IF\s+EXISTS\s+)?(.+)$/i);
      if (match) {
        const viewName = mapIdentifier(match[2]);
        return [`DROP VIEW IF EXISTS ${viewName}`];
      }
    }

    const converted = convertTop(trimmed);
    const normalized = normalizeIdentifiers(converted);
    const adapted = adaptFunctions(normalized);
    return [adapted];
  }

  function mapIdentifier(identifier) {
    let name = identifier.trim();
    name = name.replace(/^"|"$/g, '');
    name = name.replace(/^\[|\]$/g, '');
    return normalizeIdentifierName(name);
  }

  function normalizeIdentifierName(name) {
    let result = name;
    result = result.replace(/^Sales\./i, 'Sales_');
    result = result.replace(/^Production\./i, 'Production_');
    result = result.replace(/^Person\./i, 'Person_');
    return result;
  }

  function normalizeIdentifiers(sql) {
    return sql
      .replace(/Sales\.([A-Za-z_]+)/gi, 'Sales_$1')
      .replace(/Production\.([A-Za-z_]+)/gi, 'Production_$1')
      .replace(/Person\.([A-Za-z_]+)/gi, 'Person_$1');
  }

  function convertTop(statement) {
    let result = statement;
    let limit = null;

    result = result.replace(/SELECT\s+DISTINCT\s+TOP\s*\((\d+)\)\s+/i, (match, value) => {
      limit = Number(value);
      return 'SELECT DISTINCT ';
    });

    result = result.replace(/SELECT\s+DISTINCT\s+TOP\s+(\d+)\s+/i, (match, value) => {
      limit = Number(value);
      return 'SELECT DISTINCT ';
    });

    result = result.replace(/SELECT\s+TOP\s*\((\d+)\)\s+/i, (match, value) => {
      limit = Number(value);
      return 'SELECT ';
    });

    result = result.replace(/SELECT\s+TOP\s+(\d+)\s+/i, (match, value) => {
      limit = Number(value);
      return 'SELECT ';
    });

    if (limit !== null && !/LIMIT\s+\d+/i.test(result)) {
      result = result.replace(/;?\s*$/g, '');
      result = `${result} LIMIT ${limit}`;
    }

    return result;
  }

  function adaptFunctions(statement) {
    return statement.replace(/STRING_AGG\s*\(/gi, 'GROUP_CONCAT(');
  }

  function setStatus(message, statusClass) {
    elements.statusIndicator.textContent = message;
    elements.statusIndicator.className = `controls__right ${statusClass}`;
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatValue(value) {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.00$/, '');
    }
    return String(value);
  }

  function displayFatalError(message) {
    document.body.innerHTML = `<div class="fatal-error">${escapeHtml(message)}</div>`;
    const style = document.createElement('style');
    style.textContent = `
      body { background: #0f172a; color: #f8fafc; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
      .fatal-error { max-width: 480px; padding: 2rem; background: rgba(15, 23, 42, 0.85); border-radius: 16px; border: 1px solid rgba(248, 250, 252, 0.1); box-shadow: 0 18px 48px rgba(15, 23, 42, 0.35); }
    `;
    document.head.appendChild(style);
  }
})();
