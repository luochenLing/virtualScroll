import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcsspxtoviewport from "postcss-px-to-viewport";
import externalGlobals from "rollup-plugin-external-globals"; //cdn引入的时候用到，全局变量名配置
import dts from "vite-plugin-dts"; //生成dts文件用到

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
    }),
  ],
  build: {
    sourcemap: true,
    target: "esnext",
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "./src/main.ts"),
      name: "VirtualScroll", //全局变量的名称
      fileName: "virtual-scroll", //输出文件的名字
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          //UMD下的全局变量名称
          vue: "vue",
        },
      },
      // plugins: [
      //   externalGlobals({
      //     vue: "Vue",
      //   }),
      // ],
    },
  },
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 750, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          exclude: [],
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src/components"),
    },
  },
});
