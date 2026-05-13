# Домашние задания (День 1–2) с ответами

## День 1

### 1. Фильтрация Ken и Dav
```sql
SELECT *
FROM Person.Person
WHERE (FirstName LIKE 'Ken%' AND LastName LIKE 'K%')
  OR (FirstName LIKE 'Dav%' AND LastName LIKE 'D%');
```

### 2. Различные значения Title
```sql
SELECT DISTINCT Title
FROM Person.Person;
```

### 3. Первые 100 записей по женским обращениям
```sql
SELECT TOP 100 *
FROM Person.Person
WHERE Title IN ('Ms.', 'Ms', 'Mrs.')
ORDER BY BusinessEntityID;
```

### 4. Сколько всего людей
```sql
SELECT COUNT(*) AS AllCount
FROM Person.Person;
```

### 5. Количество людей по Title
```sql
SELECT Title,
       COUNT(*) AS TitleCount
FROM Person.Person
GROUP BY Title
ORDER BY TitleCount DESC;
```

### 6. Топ-10 фамилий
```sql
SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC, LastName ASC;
```

### 7. Фамилии с редкими и частыми встречаемостями
```sql
SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
HAVING COUNT(*) NOT BETWEEN 3 AND 150
ORDER BY COUNT(*) DESC;
```

### 8. Список имён через запятую
```sql
SELECT STRING_AGG(FirstName, ',') AS FirstNames
FROM Person.Person
WHERE LastName LIKE 'K%';
```

## День 2

### 1. Клиенты без заказов (NOT EXISTS)
```sql
SELECT c.CustomerID
FROM Sales.Customer AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM Sales.SalesOrderHeader AS soh
  WHERE soh.CustomerID = c.CustomerID
)
ORDER BY c.CustomerID;
```

### 2. Проданные товары Road Bikes
```sql
SELECT p.Name
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS ps ON ps.ProductSubcategoryID = p.ProductSubcategoryID
WHERE ps.Name = 'Road Bikes'
  AND p.ProductID IN (SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod);
```

### 3. Покупатели Racing Socks
```sql
SELECT p.Name, cust.FirstName, cust.LastName
FROM Sales.SalesOrderDetail AS ord
JOIN Production.Product AS p ON p.ProductID = ord.ProductID
JOIN Production.ProductModel AS pm ON pm.ProductModelID = p.ProductModelID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = ord.SalesOrderID
JOIN Sales.Customer AS c ON c.CustomerID = soh.CustomerID
JOIN Person.Person AS cust ON cust.BusinessEntityID = c.PersonID
WHERE pm.Name = 'Racing Socks';
```

### 4. Товары с ценой выше 1000
```sql
SELECT COUNT(DISTINCT Product.ProductID) AS Total
FROM Sales.SalesOrderDetail AS SalesOrderDetail
JOIN Production.Product AS Product ON SalesOrderDetail.ProductID = Product.ProductID
WHERE Product.ListPrice > 1000;
```

### 5. Продажи одежды в Лондоне
```sql
SELECT SUM(SalesOrderDetail.OrderQty) AS TotalOrderQty
FROM Production.ProductCategory AS pc
JOIN Production.ProductSubcategory AS ps ON ps.ProductCategoryID = pc.ProductCategoryID
JOIN Production.Product AS p ON p.ProductSubcategoryID = ps.ProductSubcategoryID
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON p.ProductID = SalesOrderDetail.ProductID
JOIN Sales.SalesOrderHeader AS soh ON SalesOrderDetail.SalesOrderID = soh.SalesOrderID
JOIN Person.Address AS a ON soh.ShipToAddressID = a.AddressID
WHERE a.City = 'London' AND pc.Name = 'Clothing';
```

### 6. Топ-10 товаров по выручке
```sql
SELECT TOP 10 Product.Name,
       SUM(SalesOrderDetail.OrderQty * SalesOrderDetail.UnitPrice) AS Total_Sale_Value
FROM Production.Product AS Product
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON Product.ProductID = SalesOrderDetail.ProductID
GROUP BY Product.Name
ORDER BY Total_Sale_Value DESC;
```

### 7. Единый список клиентов (UNION + NULL)
```sql
SELECT c.CustomerID,
       p.FirstName + ' ' + ISNULL(p.MiddleName + ' ', '') + p.LastName AS DisplayName
FROM Sales.Customer AS c
JOIN Person.Person AS p ON p.BusinessEntityID = c.PersonID
WHERE c.PersonID IS NOT NULL
UNION
SELECT c.CustomerID,
       s.Name AS DisplayName
FROM Sales.Customer AS c
JOIN Sales.Store AS s ON s.BusinessEntityID = c.StoreID
WHERE c.StoreID IS NOT NULL;
```
