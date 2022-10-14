---
title: "CMU - Intro to Database Systems (Fall 2022) - Topics"
description: "Tags for each lecture in CMU - Intro to Database Systems (Fall 2022)"
author: "Yash Lamba"
hideMeta: true
disableShare: true
showToc: true
ShowReadingTime: false
---

## Course Details
- **Course:** https://15445.courses.cs.cmu.edu/fall2022/#
- **Youtube:** https://www.youtube.com/playlist?list=PLSE8ODhjZXjaKScG3l0nuOiDTTqpfnWFf

## Lectures

### 01 - Relational Model & Relational Algebra
- **Notes:** https://15445.courses.cs.cmu.edu/fall2022/notes/01-introduction.pdf
- **Slides:** https://15445.courses.cs.cmu.edu/fall2022/slides/01-introduction.pdf
- **Topics:** Data (Integrity, Durability, Implementation), DBMS (Database Management Systems), Data Model, Schema, SQL, noSQL, Relational Model (Structure, Integrity, Manipulation), Relation (Table), Tuple (Row, Record), Domain, atomic/scalar values, primary key, foreign keys, DML (Data Manipulation Language), Procedural DML (Relational Algebra), Non-Procedural/Declarative DML (Relational Calculus), Relational Algebra, Fundamental Operators: Select (predicates, conjunctions, disjunctions), Projection, Union (UNION ALL), Intersection (INTERSECT), Difference (EXCEPT), Product (Cartesian Product, CROSS JOIN), join, intersection (need same schema) vs join, extra operators: (rename, assignment, duplicaiton elimination, aggregation, sorting, division), Queries, Document Data Model

### 02 - Modern SQL
- **Notes:** https://15445.courses.cs.cmu.edu/fall2022/notes/02-modernsql.pdf
- **Slides:** https://15445.courses.cs.cmu.edu/fall2022/slides/02-modernsql.pdf
- **Topics:**
    - Query Optimizer
    - Relation Languages: DDL (Data Definition Language), DML (Data Manipulation Language), DCL (Data Control Language, Security Concepts), Views, Transactions, Integrity and Referential Contraints
    - SQL is based on bags (duplicates) algebra not sets (no duplicates) algebra
    - Aggregates:
        - Bag of tuples -> Single Value (AVG, MIN, MAX, SUM, COUNT)
        - COUNT(*)/COUNT(1) evaluates null while COUNT(column) doesn't -> COUNT(*) is faster.
        - COUNT(DISTINCT column)
        - GROUP BY
        - HAVING
    - String Operations
        - Case Sensitivity and Quotations used varies across DBMS
        - LIKE (%, _)
        - SUBSTRING
        - UPPER
        - LOWER
        - ^ Can be used on outputs/predicates (select/where)
        - Concatenation -> || (sqlite, postgres), CONCAT (MySQL), + (MSSQL), in mysql spaces between strings works as well
    - EXPLAIN for query plan
    - DBMS takes query -> relation algebra (logical) -> physical plan to execute the output
    - DATE/TIME Operation
        - Syntax varies wildly
        - NOW() (postgres, mysql), CURRENT_TIMESTAMP() (postgres has this as a keyword, mysql has both func and keyword, sqllite, mssql)
        - DATE('2021-01-01')
        - EXTRACT(DAY FROM DATE()) (postgres), can subtract 2 dates in postgres -> mysql gives are very weird int o/p so to do this in mysql, can use unix_timestamp() or datediff(date, date), in sqlite -> julianday(), mssql convert datetime or datediff
    - Output Redirection:
        - Store in another table:
            - Shouldn't exist
            - Have same columns and types
        - SELECT INTO
        - CREATE TABLE + SELECT
        - INSERT INTO
        - DBMS react differently when errors occur, some treat whole insert as a transaction and undo everything in case of an error while others stop at the error but persist the older inserts
        - ORDER BY (column name/output index) [ASC/DESC]
        - LIMIT <count> OFFSET [offset]
    - Nested Queries
        - IN
        - ALL
        - ANY
        - EXISTS
        - NOT EXISTS
    - Window Functions
        - Sliding calculation
        - Like aggregation but instead of having a single aggregation, you incrementally calculate the aggregations. Useful for timeseries.
        - ROW_NUMBER(), RANK()
        - OVER - Specifies how to group tuples (PARTITION BY cid) -> like group by, (ORDER BY cid) -> to sort
    - CTE - Common Table Expressions
        - auxillary statements for large queries (like temp table for a query)
        - WITH AS
        - Alternative to nested queries/views.
        - UNION
        - CTE RECURSION
