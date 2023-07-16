/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-15 01:33:56
 * @LastEditTime: 2023-07-15 01:34:12
 * @LastEditors: 
 * @FilePath: \nest-service\config\configuration.ts
 */
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
