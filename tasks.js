window.TASKS = [
  {
    id: 'task1',
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
          expectedValues: [1, 2, 3]
        },
        {
          view: 'Sales.vStoreWithAddresses',
          column: 'CustomerID',
          expectedValues: [4]
        }
      ]
    }
  },
  {
    id: 'task2',
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
      unordered: true
    }
  },
  {
    id: 'task3',
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
      unordered: true
    }
  },
  {
    id: 'task4',
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
      singleValue: true
    }
  },
  {
    id: 'task5',
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
      singleValue: true
    }
  },
  {
    id: 'task6',
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
      numericTolerance: 0.01
    }
  },
  {
    id: 'task7',
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
      numericTolerance: 0.01
    }
  }
];
