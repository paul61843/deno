# deno side project
## 介紹
這是一個簡單的天氣顯示網頁，使用 deno + react 技術架設網站。

資料來源抓取 **氣象資料開放平臺**的資料

## 安裝
* 安裝 deno:
Homebrew (Mac):
> brew install deno

* Shell (Mac, Linux):
> curl -fsSL https://deno.land/install.sh | sh

* PowerShell (Windows):
> iwr https://deno.land/install.ps1 -useb | iex

若安裝失敗，可至官網了解安裝流程 https://deno.land/

## 啟動

電腦有安裝 bash 的話，可以執行寫好的 sh 檔執行
> bash app.sh

沒有安裝 bash，也可以用原生語法
> deno run --allow-net --allow-write --allow-read --allow-env --watch main.tsx


## 畫面
![畫面呈現](https://raw.githubusercontent.com/paul61843/weather_deno/dev/assets/images/demo_template.png)