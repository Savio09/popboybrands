# E-Commerce Website for Clothing Brand

This is a fullstack e-commerce website built for my elder brother to support his clothing brand business in Nigeria. The project is built using [Next.js](https://nextjs.org), a React framework for production.

## Features

### Customer Facing

- **Home Page**: The landing page of the website showcasing the latest products and promotions.
- **Product Listing**: A page displaying all available products with filtering and sorting options.
- **Product Details**: Detailed view of each product with images, descriptions, and pricing.
- **Shopping Cart**: Allows customers to add products to their cart and proceed to checkout.
- **Checkout Process**: A streamlined checkout process for customers to enter shipping details and make payments.
- **User Authentication**: Sign up, login, and profile management for customers.

### Admin

- **Admin Dashboard**: Overview of sales, orders, and customer activity.
- **Product Management**: Add, edit, and delete products from the inventory.
- **Order Management**: View and manage customer orders, update order statuses.
- **User Management**: Manage customer accounts and permissions.

## Project Structure

```
.env
.gitignore
.next/
components.json
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
prisma/
products/
public/
README.md
src/
  app/
    (customerFacing)/
      layout.tsx
      page.tsx
      products/
        page.tsx
    admin/
      layout.tsx
      page.tsx
      products/
        page.tsx
        new/
          page.tsx
        [id]/
          download/
            route.ts
    components/
    lib/
    middleware.ts
tailwind.config.ts
tsconfig.json
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
