# API Documentation (Basic)

Base URL: `/api`

## Auth
- `POST /auth/register` - register user, sets auth cookie + returns token payload
- `POST /auth/login` - login user, sets auth cookie + returns token payload
- `POST /auth/logout` - clears auth cookie
- `GET /auth/profile` - get current user (Bearer or cookie auth)

## Products
- `GET /products?keyword=&category=&page=&limit=` - list products
- `GET /products/:id` - product detail
- `POST /products` - create product (admin)
- `PUT /products/:id` - update product (admin)
- `DELETE /products/:id` - delete product (admin)
- `POST /products/:id/reviews` - add product review (customer)

## Cart
- `GET /cart` - get current user cart
- `POST /cart` - add/update cart item `{ productId, quantity }`
- `DELETE /cart/:productId` - remove item

## Orders
- `POST /orders` - create order
- `GET /orders/my-orders` - current user orders
- `GET /orders/:id` - order detail
- `GET /orders/admin` - all orders (admin)
- `PATCH /orders/admin/:id/status` - update order status (admin)

## Upload
- `POST /upload` - upload image (admin, multipart/form-data with `image`)
