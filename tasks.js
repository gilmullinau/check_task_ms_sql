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
          expectedValues: [11, 12, 13],
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

const DAY_THREE_TASKS = [
  {
    id: 'day3-task1',
    dayId: 'day3',
    title: 'Товары и их подкатегории',
    description: `
      <p>Выведите список всех товаров с указанием названия подкатегории.</p>
      <p>Если у товара нет подкатегории, подставьте значение <code>Without Subcategory</code> с помощью функции <code>ISNULL</code>.</p>
    `,
    starterSql: `SELECT p.Name,
       ISNULL(subcat.Name, 'Without Subcategory') AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS subcat
       ON subcat.ProductSubcategoryID = p.ProductSubcategoryID
ORDER BY p.ProductID;`,
    solutionSql: `SELECT p.Name,
       ISNULL(subcat.Name, 'Without Subcategory') AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS subcat
       ON subcat.ProductSubcategoryID = p.ProductSubcategoryID
ORDER BY p.ProductID;`,
    referenceSql: `SELECT p.Name,
       ISNULL(subcat.Name, 'Without Subcategory') AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS subcat
       ON subcat.ProductSubcategoryID = p.ProductSubcategoryID
ORDER BY p.ProductID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day3-task2',
    dayId: 'day3',
    title: 'Список заказов с ФИО/названием клиента',
    description: `
      <p>Отсортируйте заказы по <code>SubTotal</code> от наибольшего к наименьшему.</p>
      <p>В колонке «Клиент» покажите фамилию индивидуального клиента или название организации.</p>
    `,
    starterSql: `WITH IndividualCustomers AS (
  SELECT cust.CustomerID,
         per.LastName AS Name
  FROM Sales.Customer AS cust
  JOIN Person.Person AS per ON per.BusinessEntityID = cust.PersonID
  WHERE cust.PersonID IS NOT NULL
),
StoreCustomers AS (
  SELECT cust.CustomerID,
         store.Name AS Name
  FROM Sales.Customer AS cust
  JOIN Sales.Store AS store ON store.BusinessEntityID = cust.StoreID
  WHERE cust.StoreID IS NOT NULL
),
Customers AS (
  SELECT * FROM IndividualCustomers
  UNION ALL
  SELECT * FROM StoreCustomers
)
SELECT Customers.Name AS Клиент,
       soh.OrderDate,
       soh.SubTotal
FROM Sales.SalesOrderHeader AS soh
LEFT JOIN Customers ON Customers.CustomerID = soh.CustomerID
ORDER BY soh.SubTotal DESC, soh.SalesOrderID DESC;`,
    solutionSql: `WITH IndividualCustomers AS (
  SELECT cust.CustomerID,
         per.LastName AS Name
  FROM Sales.Customer AS cust
  JOIN Person.Person AS per ON per.BusinessEntityID = cust.PersonID
  WHERE cust.PersonID IS NOT NULL
),
StoreCustomers AS (
  SELECT cust.CustomerID,
         store.Name AS Name
  FROM Sales.Customer AS cust
  JOIN Sales.Store AS store ON store.BusinessEntityID = cust.StoreID
  WHERE cust.StoreID IS NOT NULL
),
Customers AS (
  SELECT * FROM IndividualCustomers
  UNION ALL
  SELECT * FROM StoreCustomers
)
SELECT Customers.Name AS Клиент,
       soh.OrderDate,
       soh.SubTotal
FROM Sales.SalesOrderHeader AS soh
LEFT JOIN Customers ON Customers.CustomerID = soh.CustomerID
ORDER BY soh.SubTotal DESC, soh.SalesOrderID DESC;`,
    referenceSql: `WITH IndividualCustomers AS (
  SELECT cust.CustomerID,
         per.LastName AS Name
  FROM Sales.Customer AS cust
  JOIN Person.Person AS per ON per.BusinessEntityID = cust.PersonID
  WHERE cust.PersonID IS NOT NULL
),
StoreCustomers AS (
  SELECT cust.CustomerID,
         store.Name AS Name
  FROM Sales.Customer AS cust
  JOIN Sales.Store AS store ON store.BusinessEntityID = cust.StoreID
  WHERE cust.StoreID IS NOT NULL
),
Customers AS (
  SELECT * FROM IndividualCustomers
  UNION ALL
  SELECT * FROM StoreCustomers
)
SELECT Customers.Name AS Клиент,
       soh.OrderDate,
       soh.SubTotal
FROM Sales.SalesOrderHeader AS soh
LEFT JOIN Customers ON Customers.CustomerID = soh.CustomerID
ORDER BY soh.SubTotal DESC, soh.SalesOrderID DESC;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day3-task3',
    dayId: 'day3',
    title: 'Компоненты в спецификациях (BOM)',
    description: `
      <p>Сформируйте список идентификаторов продуктов, которые используются в спецификациях <code>BillOfMaterials</code> (BOM — Bill of Materials, «ведомость материалов» или спецификация состава изделия) как компоненты.</p>
      <p>Можно использовать любой подход: <code>DISTINCT</code>, <code>INTERSECT</code>, <code>IN</code>, <code>EXISTS</code>.</p>
    `,
    starterSql: `SELECT DISTINCT bom.ComponentID AS ProductID
FROM Production.BillOfMaterials AS bom
ORDER BY ProductID;`,
    solutionSql: `SELECT DISTINCT bom.ComponentID AS ProductID
FROM Production.BillOfMaterials AS bom
ORDER BY ProductID;`,
    referenceSql: `SELECT DISTINCT bom.ComponentID AS ProductID
FROM Production.BillOfMaterials AS bom
ORDER BY ProductID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day3-task4',
    dayId: 'day3',
    title: 'Продукты вне спецификаций',
    description: `
      <p>Выведите продукты, которые не используются как компоненты в спецификациях <code>BillOfMaterials</code> (BOM — Bill of Materials, «ведомость материалов»).</p>
      <p>Попробуйте разные варианты (например, <code>NOT IN</code>, <code>EXCEPT</code>, <code>NOT EXISTS</code>), но результат должен содержать список уникальных <code>ProductID</code>.</p>
    `,
    starterSql: `SELECT p.ProductID
FROM Production.Product AS p
WHERE p.ProductID NOT IN (
  SELECT bom.ComponentID
  FROM Production.BillOfMaterials AS bom
  WHERE bom.ComponentID IS NOT NULL
)
ORDER BY p.ProductID;`,
    solutionSql: `SELECT p.ProductID
FROM Production.Product AS p
WHERE p.ProductID NOT IN (
  SELECT bom.ComponentID
  FROM Production.BillOfMaterials AS bom
  WHERE bom.ComponentID IS NOT NULL
)
ORDER BY p.ProductID;`,
    referenceSql: `SELECT p.ProductID
FROM Production.Product AS p
WHERE p.ProductID NOT IN (
  SELECT bom.ComponentID
  FROM Production.BillOfMaterials AS bom
  WHERE bom.ComponentID IS NOT NULL
)
ORDER BY p.ProductID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day3-task5',
    dayId: 'day3',
    title: 'Строки заказа и сумма по заказу',
    description: `
      <p>Для каждого заказа покажите дату продажи, товар, стоимость строки и общую стоимость заказа.</p>
      <p>Используйте таблицы <code>SalesOrderHeader</code>, <code>SalesOrderDetail</code> и <code>Production.Product</code>.</p>
    `,
    starterSql: `SELECT h.SalesOrderID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    solutionSql: `SELECT h.SalesOrderID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    referenceSql: `SELECT h.SalesOrderID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    comparison: {
      unordered: false,
      numericTolerance: 0.01,
    },
  },
  {
    id: 'day3-task6',
    dayId: 'day3',
    title: 'Нарастающий итог по строкам заказа',
    description: `
      <p>Добавьте к предыдущему запросу колонку с нарастающим итогом по строкам внутри каждого заказа.</p>
      <p>Используйте оконную функцию с <code>OVER (PARTITION BY ... ORDER BY ...)</code>.</p>
    `,
    starterSql: `SELECT h.SalesOrderID,
       det.SalesOrderDetailID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID ORDER BY det.SalesOrderDetailID) AS RunningTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    solutionSql: `SELECT h.SalesOrderID,
       det.SalesOrderDetailID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID ORDER BY det.SalesOrderDetailID) AS RunningTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    referenceSql: `SELECT h.SalesOrderID,
       det.SalesOrderDetailID,
       h.OrderDate,
       det.ProductID,
       p.Name,
       det.LineTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID ORDER BY det.SalesOrderDetailID) AS RunningTotal,
       SUM(det.LineTotal) OVER(PARTITION BY h.SalesOrderID) AS OrderTotalAmount
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS det ON det.SalesOrderID = h.SalesOrderID
LEFT JOIN Production.Product AS p ON p.ProductID = det.ProductID
ORDER BY h.SalesOrderID, det.SalesOrderDetailID;`,
    comparison: {
      unordered: false,
      numericTolerance: 0.01,
    },
  },
];

const DAY_FOUR_TASKS = [
  {
    id: 'day4-task1',
    dayId: 'day4',
    title: 'Лучший клиент-организация по региону',
    description: `
      <p>Напишите процедуру <code>Sales.usp_BestCustomerByRegion</code>, которая по <code>CountryRegionName</code>
      возвращает лучшего клиента-организацию. Выведите <code>CustomerID</code>, <code>Name</code> и сумму продаж.</p>
      <p>В тренажере просто выполните выборку из тела процедуры с фильтром по стране (например, <code>'Australia'</code>).</p>
    `,
    starterSql: `CREATE PROCEDURE Sales.usp_BestCustomerByRegion (@CountryRegionName NVARCHAR(50)='Canada')
AS BEGIN
    SELECT TOP 1 
           Customer.CustomerID,  
           Customer.Name ,   
           SUM(SubTotal) Total
    FROM   Sales.SalesOrderHeader SalesOrderHeader
           JOIN Sales.[vStoreWithAddresses] AS Customer
                ON  Customer.CustomerID = SalesOrderHeader.CustomerID
    WHERE  Customer.CountryRegionName = @CountryRegionName
    GROUP BY
           Customer.CustomerID,
           Customer.CountryRegionName,
           Customer.Name
    ORDER BY Total DESC
END;
GO
EXEC Sales.usp_BestCustomerByRegion 'Australia';`,
    solutionSql: `CREATE PROCEDURE Sales.usp_BestCustomerByRegion (@CountryRegionName NVARCHAR(50)='Canada')
AS BEGIN
    SELECT TOP 1 
           Customer.CustomerID,  
           Customer.Name ,   
           SUM(SubTotal) Total
    FROM   Sales.SalesOrderHeader SalesOrderHeader
           JOIN Sales.[vStoreWithAddresses] AS Customer
                ON  Customer.CustomerID = SalesOrderHeader.CustomerID
    WHERE  Customer.CountryRegionName = @CountryRegionName
    GROUP BY
           Customer.CustomerID,
           Customer.CountryRegionName,
           Customer.Name
    ORDER BY Total DESC
END;
GO
EXEC Sales.usp_BestCustomerByRegion 'Australia';`,
    referenceSql: `WITH StoreCustomers AS (
  SELECT cust.CustomerID,
         store.Name,
         addr.CountryRegionName
  FROM Sales.Customer AS cust
  JOIN Sales.Store AS store ON store.BusinessEntityID = cust.StoreID
  JOIN Sales.StoreAddress AS sa ON sa.StoreID = store.BusinessEntityID
  JOIN Person.Address AS addr ON addr.AddressID = sa.AddressID
  WHERE cust.StoreID IS NOT NULL
)
SELECT StoreCustomers.CustomerID,
       StoreCustomers.Name,
       SUM(SalesOrderHeader.SubTotal) AS Total
FROM Sales.SalesOrderHeader AS SalesOrderHeader
JOIN StoreCustomers ON StoreCustomers.CustomerID = SalesOrderHeader.CustomerID
WHERE StoreCustomers.CountryRegionName = 'Australia'
GROUP BY StoreCustomers.CustomerID,
         StoreCustomers.Name,
         StoreCustomers.CountryRegionName
ORDER BY Total DESC, StoreCustomers.CustomerID
LIMIT 1;`,
    comparison: {
      unordered: false,
      numericTolerance: 0.01,
    },
  },
  {
    id: 'day4-task2',
    dayId: 'day4',
    title: 'Функция для двух последних заказов',
    description: `
      <p>Создайте табличную функцию <code>Sales.MostRecOrders</code>, которая возвращает два последних заказа клиента.</p>
      <p>Для самопроверки выполните выборку последних заказов по конкретному <code>CustomerID</code> (например, <code>1</code>).</p>
    `,
    starterSql: `CREATE FUNCTION Sales.MostRecOrders
(
    @intCustomerID AS INT
)
RETURNS TABLE
AS
    RETURN   
    SELECT TOP(2)        SalesOrderID,
           OrderDate
    FROM   Sales.SalesOrderHeader
    WHERE  CustomerID = @intCustomerID
    ORDER BY
           OrderDate     DESC;
GO`,
    solutionSql: `CREATE FUNCTION Sales.MostRecOrders
(
    @intCustomerID AS INT
)
RETURNS TABLE
AS
    RETURN   
    SELECT TOP(2)        SalesOrderID,
           OrderDate
    FROM   Sales.SalesOrderHeader
    WHERE  CustomerID = @intCustomerID
    ORDER BY
           OrderDate     DESC;
GO`,
    referenceSql: `SELECT SalesOrderID,
       OrderDate
FROM Sales.SalesOrderHeader
WHERE CustomerID = 1
ORDER BY OrderDate DESC, SalesOrderID DESC
LIMIT 2;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day4-task3',
    dayId: 'day4',
    title: 'Два последних заказа для всех клиентов',
    description: `
      <p>Используя функцию из предыдущего задания, получите два последних заказа для клиентов-организаций и физических лиц.</p>
      <p>В качестве подсказки используйте <code>CROSS APPLY</code> и объединение результатов через <code>UNION ALL</code>.</p>
    `,
    starterSql: `SELECT Customer.Name,mro.SalesOrderID, mro.OrderDate
FROM sales.vStoreWithAddresses  AS Customer
       CROSS APPLY Sales.MostRecOrders(Customer.CustomerID) AS mro
UNION ALL
SELECT Customer.LastName,mro.SalesOrderID, mro.OrderDate
FROM sales.vIndividualCustomer  AS Customer
       CROSS APPLY Sales.MostRecOrders(Customer.CustomerID) AS mro;`,
    solutionSql: `SELECT Customer.Name,mro.SalesOrderID, mro.OrderDate
FROM sales.vStoreWithAddresses  AS Customer
       CROSS APPLY Sales.MostRecOrders(Customer.CustomerID) AS mro
UNION ALL
SELECT Customer.LastName,mro.SalesOrderID, mro.OrderDate
FROM sales.vIndividualCustomer  AS Customer
       CROSS APPLY Sales.MostRecOrders(Customer.CustomerID) AS mro;`,
    referenceSql: `WITH StoreCustomers AS (
  SELECT cust.CustomerID,
         store.Name AS DisplayName
  FROM Sales.Customer AS cust
  JOIN Sales.Store AS store ON store.BusinessEntityID = cust.StoreID
  WHERE cust.StoreID IS NOT NULL
),
IndividualCustomers AS (
  SELECT cust.CustomerID,
         per.LastName AS DisplayName
  FROM Sales.Customer AS cust
  JOIN Person.Person AS per ON per.BusinessEntityID = cust.PersonID
  WHERE cust.PersonID IS NOT NULL
),
NamedOrders AS (
  SELECT nc.DisplayName AS CustomerName,
         soh.SalesOrderID,
         soh.OrderDate,
         ROW_NUMBER() OVER (
           PARTITION BY soh.CustomerID
           ORDER BY soh.OrderDate DESC, soh.SalesOrderID DESC
         ) AS rn
  FROM Sales.SalesOrderHeader AS soh
  JOIN (
    SELECT * FROM StoreCustomers
    UNION ALL
    SELECT * FROM IndividualCustomers
  ) AS nc ON nc.CustomerID = soh.CustomerID
)
SELECT CustomerName,
       SalesOrderID,
       OrderDate
FROM NamedOrders
WHERE rn <= 2
ORDER BY CustomerName, OrderDate DESC, SalesOrderID DESC;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day4-task4',
    dayId: 'day4',
    title: 'Расшифровка статусов закупок',
    description: `
      <p>Создайте скалярную функцию <code>dbo.udf_GetPurchaseOrderStatus</code> для расшифровки статуса.</p>
      <p>Затем выведите список закупок с текстовым описанием статуса.</p>
    `,
    starterSql: `CREATE FUNCTION dbo.udf_GetPurchaseOrderStatus(@Status tinyint)
RETURNS [nvarchar](15) 
AS 

BEGIN
    DECLARE @ret nvarchar(15);

    SET @ret = 
        CASE @Status
            WHEN 1 THEN 'Pending'
            WHEN 2 THEN 'Approved'
            WHEN 3 THEN 'Rejected'
            WHEN 4 THEN 'Complete'
            ELSE '** Invalid **'
        END;
    
    RETURN @ret
END;
GO

SELECT dbo.[udf_GetPurchaseOrderStatus](ph.Status) , * 
FROM Purchasing.PurchaseOrderHeader ph;`,
    solutionSql: `CREATE FUNCTION dbo.udf_GetPurchaseOrderStatus(@Status tinyint)
RETURNS [nvarchar](15) 
AS 

BEGIN
    DECLARE @ret nvarchar(15);

    SET @ret = 
        CASE @Status
            WHEN 1 THEN 'Pending'
            WHEN 2 THEN 'Approved'
            WHEN 3 THEN 'Rejected'
            WHEN 4 THEN 'Complete'
            ELSE '** Invalid **'
        END;
    
    RETURN @ret
END;
GO

SELECT dbo.[udf_GetPurchaseOrderStatus](ph.Status) , * 
FROM Purchasing.PurchaseOrderHeader ph;`,
    referenceSql: `SELECT CASE ph.Status
         WHEN 1 THEN 'Pending'
         WHEN 2 THEN 'Approved'
         WHEN 3 THEN 'Rejected'
         WHEN 4 THEN 'Complete'
         ELSE '** Invalid **'
       END AS StatusDescription,
       ph.PurchaseOrderID,
       ph.OrderDate,
       ph.Status,
       ph.TotalDue
FROM Purchasing.PurchaseOrderHeader AS ph
ORDER BY ph.PurchaseOrderID;`,
    comparison: {
      unordered: false,
    },
  },
  {
    id: 'day4-task5',
    dayId: 'day4',
    title: 'Доля менеджеров в продажах по годам',
    description: `
      <p>Создайте процедуру <code>Sales.usp_SalesByYear</code>, которая считает сумму продаж по менеджерам за каждый год</p>
      <p>и выводит процент вклада менеджера в объём продаж в пределах года.</p>
    `,
    starterSql: `CREATE PROCEDURE Sales.usp_SalesByYear
AS
SELECT SalesPersonID,
    FullName,
    [Year],
    TotalByPersonYear,
    ROUND(TotalByPersonYear*100/SUM(TotalByPersonYear) over (partition by [Year]),2) as [% in Year]
FROM 
    (
    SELECT 
            soh.SalesPersonID
            ,p.FirstName + ' ' + ISNULL(p.MiddleName, '') + ' ' + p.LastName AS FullName  
           ,YEAR( soh.OrderDate) AS [Year] 
           ,SUM(soh.SubTotal) AS TotalByPersonYear 
 
    FROM Sales.SalesPerson sp 
    INNER JOIN Sales.SalesOrderHeader soh 
            ON sp.BusinessEntityID = soh.SalesPersonID           
    INNER JOIN Person.Person p
            ON p.BusinessEntityID = sp.BusinessEntityID
    GROUP BY soh.SalesPersonID
            ,p.FirstName + ' ' + ISNULL(p.MiddleName, '') + ' ' + p.LastName  
            ,YEAR( soh.OrderDate)
       ) AS  S
ORDER BY  [Year], 
    [% in Year] DESC;`,
    solutionSql: `CREATE PROCEDURE Sales.usp_SalesByYear
AS
SELECT SalesPersonID,
    FullName,
    [Year],
    TotalByPersonYear,
    ROUND(TotalByPersonYear*100/SUM(TotalByPersonYear) over (partition by [Year]),2) as [% in Year]
FROM 
    (
    SELECT 
            soh.SalesPersonID
            ,p.FirstName + ' ' + ISNULL(p.MiddleName, '') + ' ' + p.LastName AS FullName  
           ,YEAR( soh.OrderDate) AS [Year] 
           ,SUM(soh.SubTotal) AS TotalByPersonYear 
 
    FROM Sales.SalesPerson sp 
    INNER JOIN Sales.SalesOrderHeader soh 
            ON sp.BusinessEntityID = soh.SalesPersonID           
    INNER JOIN Person.Person p
            ON p.BusinessEntityID = sp.BusinessEntityID
    GROUP BY soh.SalesPersonID
            ,p.FirstName + ' ' + ISNULL(p.MiddleName, '') + ' ' + p.LastName  
            ,YEAR( soh.OrderDate)
       ) AS  S
ORDER BY  [Year], 
    [% in Year] DESC;`,
    referenceSql: `WITH PersonYearSales AS (
  SELECT soh.SalesPersonID,
         CAST(strftime('%Y', soh.OrderDate) AS INTEGER) AS SalesYear,
         SUM(soh.SubTotal) AS TotalByPersonYear
  FROM Sales.SalesOrderHeader AS soh
  WHERE soh.SalesPersonID IS NOT NULL
  GROUP BY soh.SalesPersonID, CAST(strftime('%Y', soh.OrderDate) AS INTEGER)
),
PersonNames AS (
  SELECT sp.BusinessEntityID AS SalesPersonID,
         per.FirstName || ' ' || IFNULL(per.MiddleName || ' ', '') || per.LastName AS FullName
  FROM Sales.SalesPerson AS sp
  JOIN Person.Person AS per ON per.BusinessEntityID = sp.BusinessEntityID
)
SELECT pys.SalesPersonID,
       pn.FullName,
       pys.SalesYear AS [Year],
       pys.TotalByPersonYear,
       ROUND(pys.TotalByPersonYear * 100.0 /
             SUM(pys.TotalByPersonYear) OVER (PARTITION BY pys.SalesYear), 2) AS [% in Year]
FROM PersonYearSales AS pys
LEFT JOIN PersonNames AS pn ON pn.SalesPersonID = pys.SalesPersonID
ORDER BY [Year], [% in Year] DESC, pys.SalesPersonID;`,
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
    tasks: DAY_ONE_TASKS,
  },
  {
    id: 'day2',
    label: 'День 2',
    title: 'День 2 · Практикум MS SQL',
    tasks: DAY_TWO_TASKS,
  },
  {
    id: 'day3',
    label: 'День 3',
    title: 'День 3 · Бизнес-сценарии Adventure Works',
    tasks: DAY_THREE_TASKS,
  },
  {
    id: 'day4',
    label: 'День 4',
    title: 'День 4 · Продвинутые сценарии Adventure Works',
    tasks: DAY_FOUR_TASKS,
  },
];

window.TASKS = [...DAY_ONE_TASKS, ...DAY_TWO_TASKS, ...DAY_THREE_TASKS, ...DAY_FOUR_TASKS];
