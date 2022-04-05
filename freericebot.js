/**
 * FreeRiceBot Javascript Function
 * Author: Nathan Tsai
 * Last Updated: Apr 2022
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

    /*** SET THIS VARIABLE BEFORE RUNNING THE BOT ***/
    this.riceWanted = 30; // amount of rice wanted


    this.timeout = 0;
    this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
    this.maxRice = this.riceDonated + this.riceWanted; // rice total desired
    this.category = 0;
    FRBthis = this;

    this.run = async function() {
        this.category = document.querySelector("div[class=rice-counter__category-text]").textContent;
        console.log("have: " + this.riceDonated + "\n");
        console.log("want: " + this.maxRice + "\n");

        // run bot with 6-8 second intervals until max rice reached
        while(true) {
            ret = FRBthis.getRice();
            if (ret != 0) {
                break;
            }
            delay = 6000 + Math.random() * 2000;
            await sleep(delay);

        }
    }

    this.getRice = function() {
        this.riceDonated = parseInt(document.querySelector("div[class=rice-counter__value] span").textContent.replace(",", ""));
        console.log("earned: " + this.riceDonated + " / " + this.maxRice + "\n");
        if (this.riceDonated >= this.maxRice) {
            console.log("stopping bot");
            return 1;
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

        // Find target button element
        button = [...document.querySelectorAll("div.card-button")].filter(div => div.innerText == (answer).toString())[0]
        button.click();
        return 0;
    }
}

var bot = new freericebot();
bot.run();
