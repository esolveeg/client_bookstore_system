import gql from "graphql-tag";

export const meQuery = gql`
  query {
    me {
      id
      name
      roles {
        name
        slug
        permissions {
          slug
        }
      }
      employee {
        branch {
          id
        }
      }
    }
  }
`;
export const createUserMutation = require("../mutations/CreateUser.gql");
export const usersQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    users(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        name
        email
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const rolesQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    roles(
      slug: "admin"
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
    ) {
      data {
        id
        name
        description
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const ordersQuery = gql`
  query(
    $from: Date
    $to: Date
    $created_by: Int
    $first: Int
    $branch: String
    $search: String
    $orderBy: String
    $orderFunc: String
    $page: Int
  ) {
    ordersQuery(
      first: $first
      branch_id: $branch
      created_by: $created_by
      from: $from
      to: $to
      page: $page
      orderBy: $orderBy
      orderFunc: $orderFunc
      search: $search
    ) {
      data {
        id
        total
        note
        branch_id
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const productsQuery = gql`
  query(
    $first: Int
    $search: String
    $orderBy: [OrderByClause!]
    $page: Int
    $branch: Int
  ) {
    products(
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
      branch: $branch
    ) {
      data {
        id
        name
        isbn
        price
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const expensesQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    expenses(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        note
        value
        date
        branch {
          name
        }
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const customersQuery = gql`
  query(
    $first: Int
    $search: String
    $orderBy: [OrderByClause!]
    $page: Int
    $branch: Int
  ) {
    customers(
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
      branch_id: $branch
    ) {
      data {
        id
        name
        branch {
          name
        }
        phone
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const rebatesQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    rebates(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        cause
        value
        employee {
          name
          id
        }
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const suppliersQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    suppliers(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        name
        email
        phone
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const outcomingOrdersQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    outcomingOrders(
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
    ) {
      data {
        id
        note
        total
        supplier {
          id
          name
        }
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const branchesQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    branches(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        name
        address
        phone
        rent
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const transactionsQuery = gql`
  query(
    $first: Int
    $branch: Int
    $search: String
    $orderBy: [OrderByClause!]
    $page: Int
  ) {
    transactions(
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
      branch_id: $branch
    ) {
      data {
        id
        approved
        branch {
          name
        }
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const employeesQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    employees(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        name
        email
        phone
        salary
        branch {
          name
        }
        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const discountsQuery = gql`
  query($first: Int, $search: String, $orderBy: [OrderByClause!], $page: Int) {
    discounts(first: $first, page: $page, orderBy: $orderBy, search: $search) {
      data {
        id
        title
        type
        branch {
          name
        }

        created_at
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
        hasMorePages
        firstItem
        lastItem
      }
    }
  }
`;

export const employeeQuery = gql`
  query($id: ID!) {
    employee(id: $id) {
      name
      email
      phone
      salary
      target
      rebates {
        id
        value
      }
      branch {
        name
        id
      }
    }
  }
`;

export const rebateQuery = gql`
  query($id: ID!) {
    rebate(id: $id) {
      cause
      value
      employee {
        name
        id
      }
    }
  }
`;

export const discountQuery = gql`
  query($id: ID!) {
    discount(id: $id) {
      id
      title
      type
      value
      percent
      products {
        id
        name
      }
      branch {
        id
        name
      }
    }
  }
`;

export const orderQuery = gql`
  query($id: ID!) {
    order(id: $id) {
      id
      productsPivot {
        qty
        product {
          isbn
          name
          id
          price
        }
      }
      branch {
        id
        name
      }
      customer {
        name
        id
      }
      products {
        name
        id
        price
      }
      discount
      payment
      total
      note
      created_at
    }
  }
`;

export const productByIsbn = gql`
  query($isbn: String!) {
    productByIsbn(isbn: $isbn) {
      id
      price
    }
  }
`;

export const outcomingOrderQuery = gql`
  query($id: ID!) {
    outcomingOrder(id: $id) {
      id
      note
      total
      productsPivot {
        qty
        product {
          name
          id
          purchased_price
        }
      }
      branch {
        id
        name
      }
      supplier {
        id
        name
      }

      products {
        id
        name
        purchased_price
      }
      created_at
    }
  }
`;

export const customerQuery = gql`
  query($id: ID!) {
    customer(id: $id) {
      id
      name
      email
      intersts
      phone
      branch {
        id
        name
      }
    }
  }
`;

export const branchQuery = gql`
  query($id: ID!) {
    branch(id: $id) {
      id
      name
      email
      address
      phone
      rent
      bills
      employees {
        id
        name
      }
      orders {
        id
        total
      }
      expenses {
        value
      }
    }
  }
`;

export const transactionQuery = gql`
  query($id: ID!) {
    transaction(id: $id) {
      id
      approved
      branch {
        name
        id
      }
      productsPivot {
        qty
      }
      products {
        id
        name
        isbn
        price
        purchased_price
      }
    }
  }
`;

export const supplierQuery = gql`
  query($id: ID!) {
    supplier(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export const productQuery = gql`
  query($id: ID!, $branch: ID) {
    product(id: $id, branch: $branch) {
      id
      isbn
      name
      purchased_price
      price
      qty
      orders {
        id
      }
    }
  }
`;

export const expenseQuery = gql`
  query($id: ID!) {
    expense(id: $id) {
      id
      date
      branch {
        name
        id
      }
      value
      note
    }
  }
`;

export const roleQuery = gql`
  query($id: ID!) {
    roleById(id: $id) {
      id
      name
      slug
      description
      users {
        name
        id
      }
      permissions {
        name
        id
      }
      created_at
    }
  }
`;

export const createRole = gql`
  mutation(
    $name: String!
    $slug: String!
    $permissions: [ID!]!
    $users: [ID!]
    $description: String
  ) {
    createRole(
      input: {
        name: $name
        slug: $slug
        permissions: $permissions
        level: 1
        users: $users
        description: $description
      }
    ) {
      id
      name
    }
  }
`;

export const createBranch = gql`
  mutation(
    $name: String!
    $email: String
    $address: String
    $phone: String
    $rent: Int
    $bills: Int
  ) {
    createBranch(
      input: {
        name: $name
        email: $email
        address: $address
        phone: $phone
        rent: $rent
        bills: $bills
      }
    ) {
      id
      name
    }
  }
`;

export const createBalance = gql`
  mutation($branch: ID!, $balance: Int!) {
    createBalance(input: { branch_id: $branch, balance: $balance }) {
      id
    }
  }
`;

export const updateBranch = gql`
  mutation(
    $id: ID!
    $name: String!
    $email: String!
    $address: String
    $phone: String
    $rent: Int
    $bills: Int
  ) {
    updateBranch(
      input: {
        id: $id
        name: $name
        email: $email
        address: $address
        phone: $phone
        rent: $rent
        bills: $bills
      }
    ) {
      id
      name
    }
  }
`;

export const updateDiscount = gql`
  mutation(
    $id: ID!
    $type: String!
    $value: Int
    $title: String
    $percent: Int
    $branch: ID
  ) {
    updateDiscount(
      input: {
        id: $id
        type: $type
        value: $value
        title: $title
        percent: $percent
        branch_id: $branch
      }
    ) {
      id
      title
    }
  }
`;

export const createDiscount = gql`
  mutation(
    $type: String!
    $value: Int
    $title: String
    $percent: Int
    $branch: ID
  ) {
    createDiscount(
      input: {
        type: $type
        value: $value
        title: $title
        percent: $percent
        branch_id: $branch
      }
    ) {
      id
      title
    }
  }
`;

export const createDiscountProduct = gql`
  mutation($discount: ID!, $products: [ID!]!) {
    createDiscountProduct(input: { discount: $discount, products: $products }) {
      id
      title
    }
  }
`;

export const createSupplier = gql`
  mutation($name: String!, $email: String, $phone: String) {
    createSupplier(input: { name: $name, email: $email, phone: $phone }) {
      id
      name
    }
  }
`;

export const updateSupplier = gql`
  mutation($id: ID!, $name: String!, $email: String, $phone: String) {
    updateSupplier(
      input: { id: $id, name: $name, email: $email, phone: $phone }
    ) {
      id
      name
    }
  }
`;

export const createCustomer = gql`
  mutation(
    $name: String!
    $email: String
    $intersts: String
    $branch: Int
    $phone: String
  ) {
    createCustomer(
      input: {
        name: $name
        email: $email
        intersts: $intersts
        branch_id: $branch
        phone: $phone
      }
    ) {
      id
      name
    }
  }
`;

export const updateCustomer = gql`
  mutation(
    $id: ID!
    $name: String!
    $email: String
    $intersts: String
    $branch: Int
    $phone: String
  ) {
    updateCustomer(
      input: {
        id: $id
        name: $name
        email: $email
        intersts: $intersts
        branch_id: $branch
        phone: $phone
      }
    ) {
      id
      name
    }
  }
`;
export const createProduct = gql`
  mutation(
    $name: String!
    $isbn: String!
    $purchased_price: Int!
    $price: Int!
  ) {
    createProduct(
      input: {
        name: $name
        isbn: $isbn
        purchased_price: $purchased_price
        price: $price
      }
    ) {
      id
      name
    }
  }
`;

export const createTransaction = gql`
  mutation($branch: ID!) {
    createTransaction(input: { branch_id: $branch }) {
      id
    }
  }
`;

export const updateTransaction = gql`
  mutation($branch: ID!, $id: ID!, $approved: Boolean) {
    updateTransaction(
      input: { id: $id, branch_id: $branch, approved: $approved }
    ) {
      id
    }
  }
`;

export const createStock = gql`
  mutation($product: ID!, $qty: Int!, $branch: ID) {
    createStock(
      input: { product_id: $product, qty: $qty, branch_id: $branch }
    ) {
      id
    }
  }
`;

export const updateProduct = gql`
  mutation(
    $id: ID!
    $name: String!
    $isbn: String!
    $purchased_price: Int!
    $price: Int!
  ) {
    updateProduct(
      input: {
        id: $id
        name: $name
        isbn: $isbn
        purchased_price: $purchased_price
        price: $price
      }
    ) {
      id
      name
    }
  }
`;

export const createExpense = gql`
  mutation($note: String!, $date: Date!, $branch: ID, $value: Int!) {
    createExpense(
      input: { date: $date, note: $note, branch_id: $branch, value: $value }
    ) {
      id
    }
  }
`;

export const createEmployee = gql`
  mutation(
    $name: String!
    $branch: ID
    $target: Int
    $salary: Int!
    $email: String
    $phone: String
  ) {
    createEmployee(
      input: {
        name: $name
        target: $target
        branch_id: $branch
        salary: $salary
        email: $email
        phone: $phone
      }
    ) {
      id
      name
    }
  }
`;

export const updateEmployee = gql`
  mutation(
    $name: String!
    $id: ID!
    $branch: ID
    $target: Int
    $salary: Int!
    $email: String
    $phone: String
  ) {
    updateEmployee(
      input: {
        id: $id
        name: $name
        target: $target
        branch_id: $branch
        salary: $salary
        email: $email
        phone: $phone
      }
    ) {
      id
      name
    }
  }
`;

export const updateExpense = gql`
  mutation($note: String!, $date: Date!, $branch: ID, $id: ID!, $value: Int!) {
    updateExpense(
      input: {
        date: $date
        id: $id
        note: $note
        branch_id: $branch
        value: $value
      }
    ) {
      id
      value
    }
  }
`;

export const updateRole = gql`
  mutation(
    $id: ID!
    $name: String!
    $slug: String!
    $permissions: [ID!]!
    $users: [ID!]!
    $description: String
  ) {
    updateRole(
      input: {
        id: $id
        name: $name
        slug: $slug
        permissions: $permissions
        level: 1
        users: $users
        description: $description
      }
    ) {
      id
      name
    }
  }
`;

export const deleteRoles = gql`
  mutation($id: [ID!]!) {
    deleteRoles(id: $id) {
      name
    }
  }
`;

export const posData = gql`
  mutation($id: ID!) {
    posData(id: $id) {
      target
      over
      rest
      sales
    }
  }
`;

export const deleteRole = gql`
  mutation($id: ID!) {
    deleteRole(id: $id) {
      name
    }
  }
`;

export const deleteRecord = gql`
  mutation($id: ID!, $table: String!) {
    deleteRecord(id: $id, table: $table)
  }
`;

export const deleteRecords = gql`
  mutation($ids: [ID!]!, $table: String!) {
    deleteRecords(ids: $ids, table: $table)
  }
`;

export const deleteOrders = gql`
  mutation($id: [ID!]!) {
    deleteOrders(id: $id) {
      id
    }
  }
`;

export const deleteOrder = gql`
  mutation($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

export const deleteTransactions = gql`
  mutation($id: [ID!]!) {
    deleteTransactions(id: $id) {
      id
    }
  }
`;

export const deleteTransaction = gql`
  mutation($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`;

export const deleteEmployees = gql`
  mutation($id: [ID!]!) {
    deleteEmployees(id: $id) {
      name
    }
  }
`;

export const deleteEmployee = gql`
  mutation($id: ID!) {
    deleteEmployee(id: $id) {
      name
    }
  }
`;

export const deleteSuppliers = gql`
  mutation($id: [ID!]!) {
    deleteSuppliers(id: $id) {
      name
    }
  }
`;

export const createOrderProduct = gql`
  mutation(
    $created_by: ID!
    $note: String
    $payment: String!
    $discount: Int
    $total: Int!
    $customer: ID
    $products: [ID!]!
    $branch: ID
    $qtys: [Int!]!
  ) {
    createOrderProduct(
      input: {
        branch: $branch
        products: $products
        qtys: $qtys
        created_by: $created_by
        note: $note
        payment: $payment
        discount: $discount
        total: $total
        customer_id: $customer
      }
    ) {
      total
    }
  }
`;
export const createOutcomingOrderProduct = gql`
  mutation(
    $outcomingOrder: ID!
    $products: [ID!]!
    $branch: ID
    $qtys: [Int!]!
  ) {
    createOutcomingOrderProduct(
      input: {
        outcomingOrder: $outcomingOrder
        branch: $branch
        products: $products
        qtys: $qtys
      }
    ) {
      total
    }
  }
`;

export const updateOutcomingOrderProduct = gql`
  mutation(
    $outcomingOrder: ID!
    $products: [ID!]!
    $branch: ID
    $qtys: [Int!]!
  ) {
    updateOutcomingOrderProduct(
      input: {
        outcomingOrder: $outcomingOrder
        branch: $branch
        products: $products
        qtys: $qtys
      }
    ) {
      total
    }
  }
`;

export const updateOrderProduct = gql`
  mutation(
    $order: ID
    $products: [ID!]!
    $branch: ID
    $qtys: [Int!]!
    $note: String
    $payment: String!
    $discount: Int
    $created_by: ID!
    $total: Int!
    $customer: ID
  ) {
    updateOrderProduct(
      input: {
        order: $order
        branch: $branch
        products: $products
        qtys: $qtys
        note: $note
        payment: $payment
        discount: $discount
        created_by: $created_by
        total: $total
        customer_id: $customer
      }
    ) {
      total
    }
  }
`;

export const createTransactionProduct = gql`
  mutation($branch: ID!, $from_branch: ID, $products: [ID!]!, $qtys: [Int!]!) {
    createTransactionProduct(
      input: {
        products: $products
        branch: $branch
        qtys: $qtys
        from_branch: $from_branch
      }
    ) {
      id
    }
  }
`;

export const updateTransactionProduct = gql`
  mutation($transaction: ID!, $branch: ID!, $products: [ID!]!, $qtys: [Int!]!) {
    updateTransactionProduct(
      input: {
        transaction: $transaction
        branch: $branch
        products: $products
        qtys: $qtys
      }
    ) {
      id
    }
  }
`;

export const createOrder = gql`
  mutation(
    $note: String
    $discount: Int
    $payment: String!
    $created_by: ID!
    $total: Int!
    $customer: ID
    $branch: ID
  ) {
    createOrder(
      input: {
        note: $note
        payment: $payment
        created_by: $created_by
        discount: $discount
        total: $total
        customer_id: $customer
        branch_id: $branch
      }
    ) {
      id
    }
  }
`;
export const createOutcomingOrder = gql`
  mutation(
    $note: String
    $created_by: ID!
    $total: Int!
    $supplier: ID
    $branch: ID
  ) {
    createOutcomingOrder(
      input: {
        note: $note
        created_by: $created_by
        total: $total
        supplier_id: $supplier
        branch_id: $branch
      }
    ) {
      id
    }
  }
`;

export const updateOutcomingOrder = gql`
  mutation(
    $id: ID!
    $note: String
    $updated_by: ID!
    $total: Int!
    $supplier: ID
    $branch: ID
  ) {
    updateOutcomingOrder(
      input: {
        id: $id
        note: $note
        updated_by: $updated_by
        total: $total
        supplier_id: $supplier
        branch_id: $branch
      }
    ) {
      id
    }
  }
`;

export const updateOrder = gql`
  mutation(
    $id: ID!
    $note: String
    $payment: String!
    $discount: Int
    $updated_by: ID!
    $total: Int!
    $customer: ID
    $branch: ID
  ) {
    updateOrder(
      input: {
        id: $id
        note: $note
        payment: $payment
        updated_by: $updated_by
        discount: $discount
        total: $total
        customer_id: $customer
        branch_id: $branch
      }
    ) {
      id
    }
  }
`;

export const deleteSupplier = gql`
  mutation($id: ID!) {
    deleteSupplier(id: $id) {
      name
    }
  }
`;

export const deleteCustomers = gql`
  mutation($id: [ID!]!) {
    deleteCustomers(id: $id) {
      name
    }
  }
`;

export const deleteCustomer = gql`
  mutation($id: ID!) {
    deleteCustomer(id: $id) {
      name
    }
  }
`;

export const deleteDiscounts = gql`
  mutation($id: [ID!]!) {
    deleteDiscounts(id: $id) {
      id
    }
  }
`;

export const deleteDiscount = gql`
  mutation($id: ID!) {
    deleteDiscount(id: $id) {
      id
    }
  }
`;

export const deleteBranches = gql`
  mutation($id: [ID!]!) {
    deleteBranches(id: $id) {
      name
    }
  }
`;

export const deleteBranch = gql`
  mutation($id: ID!) {
    deleteBranch(id: $id) {
      name
    }
  }
`;

export const deleteProducts = gql`
  mutation($id: [ID!]!) {
    deleteProducts(id: $id) {
      name
    }
  }
`;

export const deleteProduct = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      name
    }
  }
`;

export const deleteExpenses = gql`
  mutation($id: [ID!]!) {
    deleteExpenses(id: $id) {
      id
    }
  }
`;

export const deleteExpense = gql`
  mutation($id: ID!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

export const allUsers = gql`
  query {
    allUsers {
      name
      id
    }
  }
`;

export const allSuppliers = gql`
  query {
    allSuppliers {
      name
      id
    }
  }
`;

export const allBranches = gql`
  query {
    allBranches {
      name
      id
    }
  }
`;

export const allProducts = gql`
  query {
    allProducts {
      isbn
      name
      price
      purchased_price
      qty
      id
    }
  }
`;

export const allCustomers = gql`
  query {
    allCustomers {
      name
      id
    }
  }
`;

export const allPermissions = gql`
  query {
    allPermissions {
      name
      id
    }
  }
`;
