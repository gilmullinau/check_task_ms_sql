# Домашние задания (День 1–2) с подробными условиями и ответами

Документ полностью соответствует текущему набору задач в тренажёре: только **День 1** и **День 2**.

> Пометки у каждого задания:
> - **Статус:** старое / изменённое / новое
> - **Что изменилось:** кратко по сути

---

## День 1

### Задание 1. Фильтрация людей по шаблонам имени и фамилии
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Выведите всех людей из таблицы `Person.Person`, у которых:
- имя начинается с `Ken` и фамилия начинается с `K`,
**или**
- имя начинается с `Dav` и фамилия начинается с `D`.

Используйте оператор `LIKE` и объедините условия через `OR`.

**Ответ:**
```sql
SELECT *
FROM Person.Person
WHERE (FirstName LIKE 'Ken%' AND LastName LIKE 'K%')
  OR (FirstName LIKE 'Dav%' AND LastName LIKE 'D%');
```

### Задание 2. Поиск уникальных значений в колонке Title
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Найдите все различные (уникальные) значения колонки `Title` в таблице `Person.Person`.
Порядок вывода значений не важен.

**Ответ:**
```sql
SELECT DISTINCT Title
FROM Person.Person;
```

### Задание 3. Первые 100 записей с женскими обращениями
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Выведите первые 100 записей о людях с обращениями:
- `Ms.`
- `Ms`
- `Mrs.`

Чтобы выборка была детерминированной, отсортируйте результат по `BusinessEntityID`.

**Ответ:**
```sql
SELECT TOP 100 *
FROM Person.Person
WHERE Title IN ('Ms.', 'Ms', 'Mrs.')
ORDER BY BusinessEntityID;
```

### Задание 4. Подсчёт общего числа людей
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Посчитайте, сколько всего записей содержится в таблице `Person.Person`.

**Ответ:**
```sql
SELECT COUNT(*) AS AllCount
FROM Person.Person;
```

### Задание 5. Количество людей по каждому значению Title
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Выведите количество людей для каждого значения `Title`.
Отсортируйте результат по убыванию количества.

**Ответ:**
```sql
SELECT Title,
       COUNT(*) AS TitleCount
FROM Person.Person
GROUP BY Title
ORDER BY TitleCount DESC;
```

### Задание 6. Топ-10 самых популярных фамилий
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Найдите 10 самых часто встречающихся фамилий в `Person.Person`.
Выведите:
- фамилию,
- количество людей с этой фамилией.

При одинаковом количестве сортируйте фамилии по алфавиту.

**Ответ:**
```sql
SELECT TOP 10 LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
ORDER BY COUNT(*) DESC, LastName ASC;
```

### Задание 7. Редкие и очень частые фамилии
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Выведите фамилии, у которых количество людей:
- больше `150`,
**или**
- меньше `3`.

Используйте фильтр через `HAVING COUNT(*) NOT BETWEEN 3 AND 150`.
Отсортируйте результат по убыванию количества.

**Ответ:**
```sql
SELECT LastName,
       COUNT(*) AS LastNameCount
FROM Person.Person
GROUP BY LastName
HAVING COUNT(*) NOT BETWEEN 3 AND 150
ORDER BY COUNT(*) DESC;
```

### Задание 8. Агрегация имён в одну строку
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Соберите имена всех людей, у которых фамилия начинается на `K`,
в одну строку через запятую.
Используйте функцию строковой агрегации (`STRING_AGG` или аналог).

**Ответ:**
```sql
SELECT STRING_AGG(FirstName, ',') AS FirstNames
FROM Person.Person
WHERE LastName LIKE 'K%';
```

---

## День 2

### Задание 1. Клиенты без заказов (NOT EXISTS)
**Статус:** новое
**Что изменилось:** заменило старое задание на изменение `VIEW`; теперь проверяется тема `EXISTS/NOT EXISTS` без DDL.
**Условие:**
Найдите клиентов из `Sales.Customer`, которые ещё не оформили ни одного заказа.
Используйте подзапрос с `NOT EXISTS` к `Sales.SalesOrderHeader`.
Выведите `CustomerID` и отсортируйте по возрастанию.

**Ответ:**
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

### Задание 2. Проданные товары из подкатегории Road Bikes
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Выведите названия всех товаров из подкатегории `Road Bikes`, которые были проданы хотя бы один раз.
Используйте таблицы `Production.Product`, `Production.ProductSubcategory` и подзапрос по `Sales.SalesOrderDetail`.

Результат сравнивается по списку названий, порядок строк не важен.

**Ответ:**
```sql
SELECT p.Name
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS ps ON ps.ProductSubcategoryID = p.ProductSubcategoryID
WHERE ps.Name = 'Road Bikes'
  AND p.ProductID IN (SELECT sod.ProductID FROM Sales.SalesOrderDetail AS sod);
```

### Задание 3. Покупатели модели Racing Socks
**Статус:** изменённое
**Что изменилось:** убрана зависимость от `Sales.vIndividualCustomer`, используется прямой join через `Sales.Customer` и `Person.Person`.
**Условие:**
Покажите название продукта и ФИО клиентов, которые оформляли заказ на модель `Racing Socks`.
Результат должен содержать колонки:
- `Name` (название продукта),
- `FirstName`,
- `LastName`.

**Ответ:**
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

### Задание 4. Количество проданных дорогих товаров
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Посчитайте количество **уникальных** товаров с `ListPrice > 1000`,
которые были проданы за весь период.

Ожидается одно числовое значение в колонке `Total`.

**Ответ:**
```sql
SELECT COUNT(DISTINCT Product.ProductID) AS Total
FROM Sales.SalesOrderDetail AS SalesOrderDetail
JOIN Production.Product AS Product ON SalesOrderDetail.ProductID = Product.ProductID
WHERE Product.ListPrice > 1000;
```

### Задание 5. Продажи одежды в London
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Найдите общее количество (`OrderQty`) товаров категории `Clothing`,
которые были отправлены в город `London`.

Результат должен содержать одну строку с суммой в колонке `TotalOrderQty`.

**Ответ:**
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

### Задание 6. Топ-10 товаров по выручке
**Статус:** старое
**Что изменилось:** без изменений.
**Условие:**
Определите 10 товаров с наибольшей выручкой,
где выручка считается как `OrderQty * UnitPrice`.

Выведите название товара и итоговую сумму продаж.
Отсортируйте по убыванию выручки.

**Ответ:**
```sql
SELECT TOP 10 Product.Name,
       SUM(SalesOrderDetail.OrderQty * SalesOrderDetail.UnitPrice) AS Total_Sale_Value
FROM Production.Product AS Product
JOIN Sales.SalesOrderDetail AS SalesOrderDetail ON Product.ProductID = SalesOrderDetail.ProductID
GROUP BY Product.Name
ORDER BY Total_Sale_Value DESC;
```

### Задание 7. Единый список клиентов (UNION + NULL)
**Статус:** новое
**Что изменилось:** новое итоговое задание Дня 2; заменило прежнюю задачу на суммирование по странам магазинов и убрало зависимость от учебных `VIEW`.
**Условие:**
Соберите один общий список клиентов из двух источников:
- **физические лица**: используйте таблицы `Sales.Customer` и `Person.Person`;
- **организации**: используйте таблицы `Sales.Customer` и `Sales.Store`.

Что нужно вывести:
- `CustomerID`;
- `DisplayName`.

Правила:
- для физлиц в `DisplayName` соберите ФИО;
- если у физлица `MiddleName` = `NULL`, подставьте пустую строку через `ISNULL`;
- для организаций в `DisplayName` выведите `Store.Name`;
- объедините оба набора строк через `UNION`.

**Ответ:**
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
