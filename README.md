# freericebot
Small JS bot to answer freerice.com questions I made to learn some Javascript and jQuery.
Based on [this repo](https://github.com/eholcom/FreeRice).


### How to Run
- Go to [FreeRice](https://freerice.com).
- Turn AdBlock off so they can buy the rice.
- Specify the [Multiplication Table category](https://freerice.com/categories).
- On the questions page, open the console (F12).
- Click on the "Console" tab (between "Elements" and "Sources").
- Copy and paste contents of [freericebot.js](https://raw.githubusercontent.com/nhtsai/freericebot/master/freericebot.js) into the console.
- Scroll up to the beginning of the function `freericebot()`.
- Specify `riceWanted` (in grains).
    - Note: The bot may undercount due to the gradual increase of rice earned counter.
- Bot earns 30 rice if `riceWanted` is not specified.
- Press enter and let the bot earn you some rice, every 6 to 8 seconds.
- Eat rice.
