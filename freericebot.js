/**
 * FreeRiceBot Javascript Function
 * Author: Nathan Tsai
 * Last Updated: Jan 2021
 */

/**
 * FreeRiceBot function to automatically answer freerice.com questions until:
 *      a specified amount of hours has passed or
 *      a specified amount of rice was earned,
 * but not both.
 * 
 * Currently only works for Multiplication Table category of questions.
 */
function freericebot() {

    // one liner for multiplication table answer
    // $(("div[data-target=a" + eval($("div[class=card-title]").textContent.replace(" x ", "*")).toString())).click()

    // all possible answers
    // document.querySelectorAll("div.card-button")


    /****** Set ONE of these two variables before the bot is run ******/
    this.runDuration = 0; // run duration in hours
    this.riceWanted = 30; // amount of rice wanted


    this.timeout = 0;
    this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
    this.maxRice = this.riceDonated + this.riceWanted; // rice total desired
    this.category = 0;
    FRBthis = this;

    this.run = function() {
        this.category = document.querySelector("div[class=rice-counter__category-text]").textContent;
        console.log("have: " + this.riceDonated + "\n");
        console.log("want: " + this.maxRice + "\n");

        FRBthis.runLoop();
        if (this.runDuration > 0) {
            setTimeout(FRBthis.stop, 1000*60*60*this.runDuration);
        }
    }

    this.runLoop = function() {
        FRBthis.getRice();
        timeout = setTimeout(FRBthis.runLoop, 3000 + Math.random()*2500);    
    }

    this.stop = function() {
		clearTimeout(this.timeout);
	};

    this.getRice = function() {
        this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
        console.log("earned: " + this.riceDonated + " / " + this.maxRice + '\n');
        if (this.maxRice > 0 && this.riceDonated >= this.maxRice) {
            return FRBthis.stop();
        }

        question = document.getElementsByClassName("card-title")[0].textContent;

        answer = 0;
        if (this.category == "Multiplication Table") {
            question = question.replace("x", "*");
            answer = eval(question);
        }
        // TODO: handle fraction questions and fraction eval to answer string to target button
        else if (this.category == "Basic Math (Pre-Algebra)") {
            
            // Handle rounding questions
            if (question.includes("rounded")) {
                question = question.replace(" rounded =", "");
                answer = Math.round(parseInt(question));
            }
            // Handle multiplication questions
            else if (question.includes("x")) {
                question = question.replace("x", "*");
                question = question.replace(" =", "");
                answer = eval(question);
            }
            // Handle fraction questions
            else if (question.includes("")) {

            }
            // Handle other operation questions
            else {
                question = question.replace(" =", "");
                answer = eval(question);
            }
        }

        // Find target button label
        button_label = 0;
        if (answer < 0) {
            button_label = "div[data-target=a" + Math.abs(answer).toString() + "m";
        }
        else {
            button_label = "div[data-target=a" + answer.toString();
        }
        // Click correct button label
        document.querySelector(button_label).click();
    }
}

var bot = new freericebot();
bot.run();
