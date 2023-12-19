import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    await prisma.admin.create({
      data: {
        account: `admin${i}`,
        password: `admin${i}`,
      },
    });

    const position = await prisma.position.create({
      data: {
        name: `Position${i}`,
      },
    });

    const employee = await prisma.employee.create({
      data: {
        name: `Employee${i}`,
        gender: i % 2,
        birthday: new Date(`199${i}-01-01`),
        hiredAt: new Date(),
        positionId: position.id,
      },
    });

    const productType = await prisma.productType.create({
      data: {
        name: `ProductType${i}`,
      },
    });

    const supplier = await prisma.supplier.create({
      data: {
        name: `Supplier${i}`,
        address: `${i}23 Street`,
        contact: `123456789${i}`,
      },
    });

    const product = await prisma.product.create({
      data: {
        name: `Product${i}`,
        price: 100.0 + i,
        productTypeId: productType.id,
        supplierId: supplier.id,
      },
    });

    await prisma.inventory.create({
      data: {
        productId: product.id,
        supplierId: supplier.id,
        unitPrice: 100.0 + i,
        quantity: 10 + i,
        firstPurchaseAt: new Date(),
        latestPurchaseAt: new Date(),
        latestSaleAt: new Date(),
      },
    });

    const order = await prisma.order.create({
      data: {
        employeeId: employee.id,
        date: new Date(),
      },
    });

    await prisma.orderDetail.create({
      data: {
        orderId: order.id,
        productId: product.id,
        supplierId: supplier.id,
        quantity: 1 + i,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
