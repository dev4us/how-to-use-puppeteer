const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080
  });

  await page.goto("https://www.naver.com");
  await page.waitFor(3000);

  const links = await page.evaluate(() => {
    const anchors = Array.from(
      document.querySelectorAll("#NM_RTK_ROLLING_WRAP > ul > li > a > .ah_k")
    );
    return anchors.map(anchor => anchor.textContent);
  });

  //콘솔에 출력한다.
  console.log(links.join("\n"));

  await page.close();
  await browser.close();
})();
