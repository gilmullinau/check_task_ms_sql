const DAY_ONE_TASKS = [
  {
    id: 'day1-task1',
    dayId: 'day1',
    title: 'Фильтрация Ken и Dav',
    description: `
      <p>Выведите всех людей, у которых имя начинается с <code>Ken</code> и фамилия с <code>K</code>,
      а также тех, чье имя начинается с <code>Dav</code> и фамилия с <code>D</code>.</p>
      <p>Используйте оператор <code>LIKE</code> и объедините условия с помощью <code>OR</code>.</p>
    `,
    starterSql: `SELECT *
FROM Person.Person
WHERE (FirstName LIKE 'Ken%' AND LastName LIKE 'K%')
  OR (FirstName LIKE 'Dav%' AND LastName LIKE 'D%');`,
    solutionSql: `SELECT *
FROM Person.Person
WHERE (FirstName LIKE 'Ken%' AND LastName LIKE 'K%')
  OR (FirstName LIKE 'Dav%' AND LastName LIKE 'D%');`,
    referenceSql: `SELECT *
FROM Person.Person
WHERE (FirstName LIKE 'Ken%' AND LastName LIKE 'K%')
  OR (FirstName LIKE 'Dav%' AND LastName LIKE 'D%')
ORDER BY BusinessEntityID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day1-task2',
    dayId: 'day1',
    title: 'Различные значения Title',
    description: `
      <p>Найдите все различные значения колонки <code>Title</code> в таблице <code>Person.Person</code>.</p>
      <p>Результат можно выводить в любом порядке.</p>
    `,
    starterSql: `SELECT DISTINCT Title
FROM Person.Person;`,
    solutionSql: `SELECT DISTINCT Title
FROM Person.Person;`,
    referenceSql: `SELECT DISTINCT Title
FROM Person.Person;`,
    comparison: {
      unordered: true,
    },
  },
  {
    id: 'day1-task3',
    dayId: 'day1',
    title: 'Первые 100 записей по женским обращениям',
    description: `
      <p>Выведите 100 записей о людях с обращениями <code>Ms.</code>, <code>Ms</code> или <code>Mrs.</code>.</p>
      <p>Отсортируйте результат по <code>BusinessEntityID</code>, чтобы сделать выборку детерминированной.</p>
    `,
    starterSql: `SELECT TOP 100 *
FROM Person.Person
WHERE Title IN ('Ms.', 'Ms', 'Mrs.')
ORDER BY BusinessEntityID;`,
    solutionSql: `SELECT TOP 100 *
FROM Person.Person
WHERE Title IN ('Ms.', 'Ms', 'Mrs.')
ORDER BY BusinessEntityID;`,
    referenceSql: `SELECT *
FROM Person.Person
WHERE Title IN ('Ms.', 'Ms', 'Mrs.')
ORDER BY BusinessEntityID
LIMIT 100;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day1-task4',
    dayId: 'day1',
    title: 'Сколько всего людей',
    description: `
      <p>Посчитайте, сколько записей находится в таблице <code>Person.Person</code>.</p>
    `,
    starterSql: `SELECT COUNT(*) AS AllCount
FROM Person.Person;`,
    solutionSql: `SELECT COUNT(*) AS AllCount
FROM Person.Person;`,
    referenceSql: `SELECT COUNT(*) AS AllCount
FROM Person.Person;`,
    comparison: {
      singleValue: true,
    },
  },
  {
    id: 'day1-task5',
    dayId: 'day1',
    title: 'Количество людей по Title',
    description: `
      <p>Выведите количество людей для каждого значения <code>Title</code> и отсортируйте результат по убыванию.</p>
    `,
    starterSql: `SELECT Title,
       COUNT(*) AS TitleCount
FROM Person.Person
GROUP BY Title
ORDER BY TitleCount DESC;`,
    solutionSql: `SELECT Title,
       COUNT(*) AS TitleCount
FROM Person.Person
GROUP BY Title
ORDER BY TitleCount DESC;`,
    referenceSql: `SELECT Title,
       COUNT(*) AS TitleCount
FROM Person.Person
GROUP BY Title
ORDER BY TitleCount DESC, Title ASC;`,
    comparison: {
      unordered: true,
    },
  },
  {
    id: 'day1-task6',
    dayId: 'day1',
    title: 'Топ-10 фамилий',
    description: `
      <p>Найдите десять самых популярных фамилий и выведите их вместе с количеством людей.</p>
      <p>При одинаковой частоте отсортируйте фамилии в алфавитном порядке.</p>
    `,
    starterSql: `SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC, LastName ASC;`,
    solutionSql: `SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC, LastName ASC;`,
    referenceSql: `SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC, LastName ASC
LIMIT 10;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day1-task7',
    dayId: 'day1',
    title: 'Фамилии с редкими и частыми встречаемостями',
    description: `
      <p>Выведите фамилии, количество людей с которыми больше <code>150</code>, а также те, где оно меньше <code>3</code>.</p>
      <p>Используйте фильтр <code>HAVING COUNT(*) NOT BETWEEN 3 AND 150</code> и отсортируйте результат по убыванию.</p>
    `,
    starterSql: `SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
HAVING COUNT(*) NOT BETWEEN 3 AND 150
ORDER BY COUNT(*) DESC;`,
    solutionSql: `SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
HAVING COUNT(*) NOT BETWEEN 3 AND 150
ORDER BY COUNT(*) DESC;`,
    referenceSql: `SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
HAVING COUNT(*) NOT BETWEEN 3 AND 150
ORDER BY COUNT(*) DESC, LastName ASC;`,
    comparison: {
      unordered: true,
    },
  },
  {
    id: 'day1-task8',
    dayId: 'day1',
    title: 'Список имён через запятую',
    description: `
      <p>Соберите имена всех людей, у которых фамилия начинается с буквы <code>K</code>, в строку через запятую.</p>
      <p>Используйте функцию конкатенации строк (<code>STRING_AGG</code> или аналог).</p>
    `,
    starterSql: `SELECT STRING_AGG(FirstName, ',') AS FirstNames
FROM Person.Person
WHERE LastName LIKE 'K%';`,
    solutionSql: `SELECT STRING_AGG(FirstName, ',') AS FirstNames
FROM Person.Person
WHERE LastName LIKE 'K%';`,
    referenceSql: `SELECT GROUP_CONCAT(FirstName, ',') AS FirstNames
FROM Person.Person
WHERE LastName LIKE 'K%';`,
    comparison: {
      singleValue: true,
    },
  },
];

const DAY_TWO_TASKS = [
  {
    id: 'task1',
    dayId: 'day2',
    title: 'Клиенты без заказов (NOT EXISTS)',
    description: `
      <p>Найдите клиентов, которые ещё не сделали ни одного заказа.</p>
      <p>Используйте подзапрос с <code>NOT EXISTS</code>. Выведите <code>CustomerID</code> и отсортируйте по возрастанию.</p>
    `,
    starterSql: `SELECT c.CustomerID
FROM Sales.Customer AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM Sales.SalesOrderHeader AS soh
  WHERE soh.CustomerID = c.CustomerID
)
ORDER BY c.CustomerID;`,
    solutionSql: `SELECT c.CustomerID
FROM Sales.Customer AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM Sales.SalesOrderHeader AS soh
  WHERE soh.CustomerID = c.CustomerID
)
ORDER BY c.CustomerID;`,
    referenceSql: `SELECT c.CustomerID
FROM Sales.Customer AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM Sales.SalesOrderHeader AS soh
  WHERE soh.CustomerID = c.CustomerID
)
ORDER BY c.CustomerID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'task2',
    dayId: 'day2',
    title: 'Проданные товары Road Bikes',
    description: `
      <p>Выведите названия всех товаров из подкатегории <strong>Road Bikes</strong>, которые хотя бы раз были проданы.</p>
      <p>Сравнение выполняется по списку названий (порядок не важен).</p>
    `,
    starterSql: `SELECT p.Name
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS ps ON ps.ProductSubcategoryID = p.ProductSubcategoryID
WHERE ps.Name = 'Road Bikes'
  AND p.ProductID IN (
    SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod
  );`,
    solutionSql: `SELECT p.Name
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS ps ON ps.ProductSubcategoryID = p.ProductSubcategoryID
WHERE ps.Name = 'Road Bikes'
  AND p.ProductID IN (SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod);`,
    referenceSql: `SELECT p.Name
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS ps ON ps.ProductSubcategoryID = p.ProductSubcategoryID
WHERE ps.Name = 'Road Bikes'
  AND p.ProductID IN (SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod);`,
    comparison: {
      unordered: true,
    },
  },
  {
    id: 'task3',
    dayId: 'day2',
    title: 'Покупатели Racing Socks',
    description: `
      <p>Покажите название продукта и ФИО клиентов, оформивших заказ на модель <strong>Racing Socks</strong>.</p>
      <p>Результат должен содержать колонки <code>Name</code>, <code>FirstName</code>, <code>LastName</code>.</p>
    `,
    starterSql: `SELECT p.Name, cust.FirstName, cust.LastName
FROM Sales.SalesOrderDetail AS ord
JOIN Production.Product AS p ON p.ProductID = ord.ProductID
JOIN Production.ProductModel AS pm ON pm.ProductModelID = p.ProductModelID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = ord.SalesOrderID
JOIN Sales.Customer AS c ON c.CustomerID = soh.CustomerID
JOIN Person.Person AS cust ON cust.BusinessEntityID = c.PersonID
WHERE pm.Name = 'Racing Socks';`,
    solutionSql: `SELECT p.Name, cust.FirstName, cust.LastName
FROM Sales.SalesOrderDetail AS ord
JOIN Production.Product AS p ON p.ProductID = ord.ProductID
JOIN Production.ProductModel AS pm ON pm.ProductModelID = p.ProductModelID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = ord.SalesOrderID
JOIN Sales.Customer AS c ON c.CustomerID = soh.CustomerID
JOIN Person.Person AS cust ON cust.BusinessEntityID = c.PersonID
WHERE pm.Name = 'Racing Socks';`,
    referenceSql: `SELECT p.Name, per.FirstName, per.LastName
FROM Sales.SalesOrderDetail AS ord
JOIN Production.Product AS p ON p.ProductID = ord.ProductID
JOIN Production.ProductModel AS pm ON pm.ProductModelID = p.ProductModelID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = ord.SalesOrderID
JOIN Sales.Customer AS cust ON cust.CustomerID = soh.CustomerID
JOIN Person.Person AS per ON per.BusinessEntityID = cust.PersonID
WHERE pm.Name = 'Racing Socks';`,
    comparison: {
      unordered: true,
    },
  },
  {
    id: 'task4',
    dayId: 'day2',
    title: 'Товары с ценой выше 1000',
    description: `
      <p>Посчитайте, сколько уникальных товаров с <code>ListPrice &gt; 1000</code> было продано за весь период.</p>
      <p>Ожидается одно числовое значение в колонке <code>Total</code>.</p>
    `,
    starterSql: `SELECT COUNT(DISTINCT Product.ProductID) AS Total
FROM Sales.SalesOrderDetail AS SalesOrderDetail
JOIN Production.Product AS Product ON SalesOrderDetail.ProductID = Product.ProductID
WHERE Product.ListPrice > 1000;`,
    solutionSql: `SELECT COUNT(DISTINCT Product.ProductID) AS Total
FROM Sales.SalesOrderDetail AS SalesOrderDetail
JOIN Production.Product AS Product ON SalesOrderDetail.ProductID = Product.ProductID
WHERE Product.ListPrice > 1000;`,
    referenceSql: `SELECT COUNT(DISTINCT Product.ProductID) AS Total
FROM Sales.SalesOrderDetail AS SalesOrderDetail
JOIN Production.Product AS Product ON SalesOrderDetail.ProductID = Product.ProductID
WHERE Product.ListPrice > 1000;`,
    comparison: {
      singleValue: true,
    },
  },
  {
    id: 'task5',
    dayId: 'day2',
    title: 'Продажи одежды в Лондоне',
    description: `
      <p>Найдите общее количество (<code>OrderQty</code>) товаров категории <strong>Clothing</strong>, отправленных в город <strong>London</strong>.</p>
      <p>Результатом должна быть одна строка с суммой в колонке <code>TotalOrderQty</code>.</p>
    `,
    starterSql: `SELECT SUM(sod.OrderQty) AS TotalOrderQty
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS sod ON p.ProductID = sod.ProductID
JOIN Sales.SalesOrderHeader AS soh ON sod.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';`,
    solutionSql: `SELECT SUM(SalesOrderDetail.OrderQty) AS TotalOrderQty
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON p.ProductID = SalesOrderDetail.ProductID
JOIN Sales.SalesOrderHeader AS soh ON SalesOrderDetail.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';`,
    referenceSql: `SELECT SUM(sod.OrderQty) AS TotalOrderQty
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS sod ON p.ProductID = sod.ProductID
JOIN Sales.SalesOrderHeader AS soh ON sod.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';`,
    comparison: {
      singleValue: true,
    },
  },
  {
    id: 'task6',
    dayId: 'day2',
    title: 'Топ-10 товаров по выручке',
    description: `
      <p>Определите 10 самых продаваемых товаров по общей стоимости (<code>OrderQty * UnitPrice</code>).</p>
      <p>Отсортируйте результат по убыванию суммы продаж.</p>
    `,
    starterSql: `SELECT TOP 10 Product.Name,
       SUM(SalesOrderDetail.OrderQty * SalesOrderDetail.UnitPrice) AS Total_Sale_Value
FROM Production.Product AS Product
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON Product.ProductID = SalesOrderDetail.ProductID
GROUP BY Product.Name
ORDER BY Total_Sale_Value DESC;`,
    solutionSql: `SELECT TOP 10 Product.Name,
       SUM(SalesOrderDetail.OrderQty * SalesOrderDetail.UnitPrice) AS Total_Sale_Value
FROM Production.Product AS Product
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON Product.ProductID = SalesOrderDetail.ProductID
GROUP BY Product.Name
ORDER BY Total_Sale_Value DESC;`,
    referenceSql: `SELECT Product.Name,
       SUM(SalesOrderDetail.OrderQty * SalesOrderDetail.UnitPrice) AS Total_Sale_Value
FROM Production.Product AS Product
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON Product.ProductID = SalesOrderDetail.ProductID
GROUP BY Product.Name
ORDER BY Total_Sale_Value DESC
LIMIT 10;`,
    comparison: {
      unordered: false,
      numericTolerance: 0.01,
    },
  },
  {
    id: 'task7',
    dayId: 'day2',
    title: 'Единый список клиентов (UNION + NULL)',
    description: `
      <p>Соберите единый список клиентов: физических лиц и организаций.</p>
      <p>Для физических лиц выведите ФИО, для организаций — название. Используйте <code>UNION</code> и замену <code>NULL</code> через <code>ISNULL</code> для среднего имени.</p>
      <p>Результат: колонки <code>CustomerID</code> и <code>DisplayName</code>.</p>
    `,
    starterSql: `SELECT c.CustomerID,
       p.FirstName + ' ' + ISNULL(p.MiddleName + ' ', '') + p.LastName AS DisplayName
FROM Sales.Customer AS c
JOIN Person.Person AS p ON p.BusinessEntityID = c.PersonID
WHERE c.PersonID IS NOT NULL
UNION
SELECT c.CustomerID,
       s.Name AS DisplayName
FROM Sales.Customer AS c
JOIN Sales.Store AS s ON s.BusinessEntityID = c.StoreID
WHERE c.StoreID IS NOT NULL;`,
    solutionSql: `SELECT c.CustomerID,
       p.FirstName + ' ' + ISNULL(p.MiddleName + ' ', '') + p.LastName AS DisplayName
FROM Sales.Customer AS c
JOIN Person.Person AS p ON p.BusinessEntityID = c.PersonID
WHERE c.PersonID IS NOT NULL
UNION
SELECT c.CustomerID,
       s.Name AS DisplayName
FROM Sales.Customer AS c
JOIN Sales.Store AS s ON s.BusinessEntityID = c.StoreID
WHERE c.StoreID IS NOT NULL;`,
    referenceSql: `SELECT c.CustomerID,
       p.FirstName + ' ' + ISNULL(p.MiddleName + ' ', '') + p.LastName AS DisplayName
FROM Sales.Customer AS c
JOIN Person.Person AS p ON p.BusinessEntityID = c.PersonID
WHERE c.PersonID IS NOT NULL
UNION
SELECT c.CustomerID,
       s.Name AS DisplayName
FROM Sales.Customer AS c
JOIN Sales.Store AS s ON s.BusinessEntityID = c.StoreID
WHERE c.StoreID IS NOT NULL;`,
    comparison: {
      unordered: true,
    },
  },
];

window.TASK_DAYS = [
  {
    id: 'day1',
    label: 'День 1',
    title: 'День 1 · Самостоятельная работа',
    tasks: DAY_ONE_TASKS,
  },
  {
    id: 'day2',
    label: 'День 2',
    title: 'День 2 · Практикум MS SQL',
    tasks: DAY_TWO_TASKS,
  },
];

window.TASKS = [...DAY_ONE_TASKS, ...DAY_TWO_TASKS];
