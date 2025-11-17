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
    `,
    starterSql: `SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC;`,
    solutionSql: `SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC;`,
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
    title: 'Обновление представлений клиентов',
    description: `
      <p>Добавьте в представления <code>Sales.vIndividualCustomer</code> и <code>Sales.vStoreWithAddresses</code>
      колонку <code>CustomerID</code> из таблицы <code>Sales.Customer</code>.</p>
      <ul>
        <li>Для <code>vIndividualCustomer</code> соедините клиентов с персоной по полю <code>CustomerID</code>.</li>
        <li>Для <code>vStoreWithAddresses</code> сопоставьте записи магазина с клиентами-организациями.</li>
        <li>Можно использовать <code>ALTER VIEW</code> или связку <code>DROP VIEW</code> + <code>CREATE VIEW</code>.</li>
      </ul>
    `,
    starterSql: `-- Добавьте CustomerID в оба представления
`,
    solutionSql: `ALTER VIEW Sales.vIndividualCustomer AS
SELECT c.CustomerID,
       p.BusinessEntityID AS PersonID,
       p.FirstName,
       p.LastName
FROM Sales.Customer AS c
JOIN Person.Person AS p ON p.BusinessEntityID = c.PersonID;

ALTER VIEW Sales.vStoreWithAddresses AS
SELECT cust.CustomerID,
       s.Name,
       a.AddressLine1,
       a.City,
       a.CountryRegionName
FROM Sales.Customer AS cust
JOIN Sales.Store AS s ON s.BusinessEntityID = cust.StoreID
JOIN Sales.StoreAddress AS sa ON sa.StoreID = s.BusinessEntityID
JOIN Person.Address AS a ON a.AddressID = sa.AddressID
WHERE cust.StoreID IS NOT NULL;`,
    verification: {
      type: 'viewColumn',
      checks: [
        {
          view: 'Sales.vIndividualCustomer',
          column: 'CustomerID',
          expectedValues: [1, 2, 3],
        },
        {
          view: 'Sales.vStoreWithAddresses',
          column: 'CustomerID',
          expectedValues: [4],
        },
      ],
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
JOIN Sales.vIndividualCustomer AS cust ON cust.CustomerID = soh.CustomerID
WHERE pm.Name = 'Racing Socks';`,
    solutionSql: `SELECT p.Name, cust.FirstName, cust.LastName
FROM Sales.SalesOrderDetail AS ord
JOIN Production.Product AS p ON p.ProductID = ord.ProductID
JOIN Production.ProductModel AS pm ON pm.ProductModelID = p.ProductModelID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = ord.SalesOrderID
JOIN Sales.vIndividualCustomer AS cust ON cust.CustomerID = soh.CustomerID
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
      <p>Результатом должна быть одна строка с суммой.</p>
    `,
    starterSql: `SELECT SUM(sod.OrderQty)
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS sod ON p.ProductID = sod.ProductID
JOIN Sales.SalesOrderHeader AS soh ON sod.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';`,
    solutionSql: `SELECT SUM(SalesOrderDetail.OrderQty)
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON p.ProductID = SalesOrderDetail.ProductID
JOIN Sales.SalesOrderHeader AS soh ON SalesOrderDetail.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';`,
    referenceSql: `SELECT SUM(sod.OrderQty)
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
    title: 'Сумма заказов по странам магазинов',
    description: `
      <p>Выведите общую стоимость заказов (<code>SubTotal</code>) по странам клиентов-организаций.</p>
      <p>Результат отсортируйте по убыванию суммы. Значения округлите до двух знаков.</p>
    `,
    starterSql: `SELECT Store.CountryRegionName,
       ROUND(SUM(SubTotal),2) AS Total
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.vStoreWithAddresses AS Store ON soh.CustomerID = Store.CustomerID
GROUP BY Store.CountryRegionName
ORDER BY SUM(SubTotal) DESC;`,
    solutionSql: `SELECT Store.CountryRegionName,
       ROUND(SUM(SubTotal),2) AS Total
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.vStoreWithAddresses AS Store ON soh.CustomerID = Store.CustomerID
GROUP BY Store.CountryRegionName
ORDER BY SUM(SubTotal) DESC;`,
    referenceSql: `SELECT Store.CountryRegionName,
       ROUND(SUM(SubTotal),2) AS Total
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.Customer AS cust ON cust.CustomerID = soh.CustomerID
JOIN Sales.Store AS Store ON Store.BusinessEntityID = cust.StoreID
WHERE cust.StoreID IS NOT NULL
GROUP BY Store.CountryRegionName
ORDER BY SUM(SubTotal) DESC;`,
    comparison: {
      unordered: false,
      numericTolerance: 0.01,
    },
  },
];

window.TASK_DAYS = [
  {
    id: 'day1',
    label: 'День 1',
    title: 'День 1 · Самостоятельная работа',
    description: 'Разминка по базе Person.Person: фильтрация, агрегаты и работа с текстом.',
    tasks: DAY_ONE_TASKS,
  },
  {
    id: 'day2',
    label: 'День 2',
    title: 'День 2 · Практикум MS SQL',
    description: 'Практика по схемам Sales и Production с проверкой сложных запросов.',
    tasks: DAY_TWO_TASKS,
  },
];

window.TASKS = [...DAY_ONE_TASKS, ...DAY_TWO_TASKS];
