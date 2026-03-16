let gdp = [0, 0, 0, 0, 0]
let cpi = 1
let interest = 0
let minimum_wage = 100
let tax = 0
let unemployment = [0.03, 0.03]
let frictionally_unemployed = 0;
let grid_size = 30;

let util_money_left = 0;
let housing_money_left = 0;

let category_controls_unlocked = false
let pm_unlocked = false

const base_living_cost = 50
const reproduction_factor = 2 // Hamster must have this much living cost
const lending_factor = 1.5;
const hamster_names = [ "Nibbles", "Cheddar", "Whiskers", "Pippin", "Squeaks", 
    "Mochi", "Biscuit", "Pebble", "Clover", "Hazel", "Pumpkin", "Button", "Cinnamon", 
    "Toffee II", "Marbles", "Acorn", "Pudding", "Snickers", "Dumpling", "Waffles", 
    "Fudge", "Pickles", "Truffle", "Bubbles", "Sprout", "Noodle", "Pancake", "Tater", 
    "Churro", "Gizmo", "Sprocket", "Widget", "Copper", "Rusty", "Maple", "Velvet", "Dusty", "Hobbes", "Archie", "Milo", 
    "Otis", "Theo", "Remy", "Finn", "Louie", "Oliver", "Almond", "Cashew", "Walnut",
    "Pecan","Barley","Oats","Kernel","Ledger","Coin","Mint","Penny","Nickel","Dime","Goldie","Vault","Bonds","Cobb","Cocoa",
    "Saffron","Pepper","Gingersnap","Mocha","Latte","Chai","Twix","Ziggy","Nova","Orbit","Pixel","Turbo","Quill","Nimbus",
    "Fritter", "Crumbs", "Sir Jigglecheeks V", "Gregory", "Labubu Dubai Chocolate", "Bonbon", "Rawwwr", "Chungusus", "Jimothy",
    "Timulus the younger"
];

const hamster_commentary = {"utility_complaints": ["New world record for longest time without shower!", 
                                                   "Hamster sacrifices firstborn in search of working power outlet",
                                                   "Catastrophic sewage backflow causes new volcano to form",
                                                   "Demand for hamster wheels up 400% as hamsters build their own power plants",
                                                   "\"We're pretty sure it's flour\" says local citizen after finding two bags of white powder in abandoned building",
                                                   "Literacy rates at 0% for the 10th year in a row! We need some schools",
                                                   "Hamster gets robbed at gunpoint, develops taste for bullets. \"All our ammo is gone\" reports gun store owner.",
                                                   "\"My child is 5 years old and still can't do differentiation, let alone differential equations\" says concerned hamster mother on the state of education",
                                                   "Hamster caught slurping worms out of the ground due to hunger, gets cult formed around him"],
                            "utility_complements": ["Stink epidemic solved after genius hamster suggests giving running water to all households", 
                                                   "Hamstapol up and running again, excecuting, uhh I mean, reforming criminals near you",
                                                   "\"Is your local pharmahamster trustworthy? Just because they have a suit doesn't mean they won''t kill you\", says a hamster in a suit",
                                                   "Hamster finds cure to rabies, asking the local guinea pig clan for guinea pigs to test on",
                                                   "Unemployed local hamster finds a way to shoot lighting. Maybe giving free power wasn't a good idea...",
                                                   "\"Nerds Everywhere!\" exclaims hamster as school bursts into session again",
                                                   "New world record for youngest hamster to master calculus at just age 3",
                                                   "Most spherical hamster found to be just 0.1cm off on the horizontal axis, prompting food shortages to correct the error"],
                            "random": ["2,000 pounds of cheese found in a human basement. Authorities urge hamsters to not act rashly as they secure the goods for \"further dietary testing\" performed by a \"specialist\"",
                                       "Toffee Fluffybottoms, PhD, Supreme Leader, CEO, CFO, Hamstapol Grandhamster obtains a new title of Superior Seedcracker",
                                       "Cheese supply quadruples after monopoly on cheese resolved. \"We have revived the deadweight loss to liveweight gain!\", says hamster",

                            ],
                            "tax_complaints": ["Exasperated working class hamster who has not seen a single dollar in 30 years may just have dementia, claims chief of the Hamster Revenue Agency as they pick money out of his wallet.",
                                               "Where are your taxes going? Study finds it's most likely Toffee's food budget.",
                                               "Hamsters caught bribing human tax authorities to tax them instead after taxes hit 20% for the third year in a row. Little do they know"
                            ],
                            "tax_neutral": ["Toffee Fluffybottoms goes on a diet, causing a 10% drop in tax rates",
                                            "Hamster sees first dollar in 35 years, gets cult formed around them",
                                            "Hamstapol instant noodle budget falls, causing another cut in taxes",
                                            "Federal bank cautions that lower taxes may mean no more free sunflower seeds in schools, much to the dissappointment of the three year old population."
                            ],
                            "tax_complements": ["Human experts perplexed at how a society runs with such low taxes. Hamstapol Lobotomy Unit called in to prevent further leaks on the whereabouts of the city.",
                                                "Toffee Fluffybottoms sacrifices whole food budget, leading to lowest taxes in a century. \"It's for the nation\" she claims.",
                                                "Nuclear warhead development stops as there's simply not enough budget. Hamster general urges government to raise taxes, gets replaced."

                            ]}

                            
const natural_unemployment = 0.03

let hamster_list = []

const hamster_utility_use = 5

let city_grid = []


let available_amenity = 0;

let feed = ["", "", "", "", ""];

const population_cap = 5000;
const preferred_children = 3;
let inflation_factor = 1;

let thisYearMoney = 0;
let totalMoney = 0;
let pretax = 0;

let public_necessity_portion = 0.7
let rd_portion = 0
let housing_portion = 0.2
let savings_portion = 0.1

let n_children = 0;
let n_rebelling = 0;
let n_employed = 0;
let n_unemployed = 0;
let n_rich = 0;

let housing_supply = 0
let house_list = [];

let available_cat_utility = {"power": 0, "water": 0, "food": 0, "health": 0, "security": 0, "education": 0}
let available_utility = 0;
let utilities_list = [];

let inheritance_tax = false;
let grace_period = true;

const necessity_data = {"power" : {
                            "small-generator": {maintenence: 1, construction: 5, utils: 8, symbol: "⚡1", name: "Small Generator", flavor_text: "Nothing like waking up to the grinding of a generator and the smell of oil!"},
                            "refined-generator": {maintenence: 2, construction: 10, utils: 18, symbol: "⚡2", name: "Refined Generator", flavor_text: "Like a small generator, but with a fancy trim and uhhh..."},
                            "oil-power": {maintenence: 3, construction: 25, utils: 35, symbol: "⚡3", name: "Oil Power Plant", flavor_text: "Harness the power of black gold to power your city. As long as those humans don't mind us borrowing from their cars."},
                            "geothermal-power": {maintenence: 4, construction: 35, utils: 60, symbol: "⚡4", name: "Geothermal Power Plant", flavor_text: "I mean, you've been living underground the whole time, so may as well"},
                            "nuclear-power": {maintenence: 6, construction: 50, utils: 110, symbol: "⚡5", name: "Nuclear Power Plant", flavor_text: "Three eyed children? What are you talking about?"},
                            "hamster-power": {maintenence: 8, construction: 50, utils: 160, symbol: "⚡6", name: "Hamster Power Plant", flavor_text: "The best way to boost employment and efficiency. Just make sure to feed them"}
                        },
                        "water": {
                            "basic-tank": {maintenence: 1, construction: 5, utils: 12, symbol: "💧1", name: "Basic Water Tank", flavor_text: "As the name suggests, a water tank"},
                            "purifier-tank": {maintenence: 2, construction: 10, utils: 50, symbol: "💧2", name: "Purifying Water Tank", flavor_text: "A water tank with purifying properties DOES NOT give you the permission to dump dirty toilet water into it."},
                            "water-refinery": {maintenence: 4, construction: 22, utils: 100,  symbol: "💧3", name: "Water Treatment Plant", flavor_text: "With better efficiency than the one the humans have on their tin can in space!"}
                        },
                        "food": {
                            "greenhouse": {maintenence: 1, construction: 7, utils: 12, symbol: "🌾1", name: "Greenhouse", flavor_text: "A greenhouse for those with green thumbs"},
                            "growery": {maintenence: 2, construction: 12, utils: 40, symbol: "🌾2", name: "Growery", flavor_text: "Fancier greenhouse with auto-watering pipes and auto-hamstering hamsters"},
                            "farm": {maintenence: 3, construction: 18, utils: 80, symbol: "🌾3", name: "Farm", flavor_text: "Since fields aren't an option, most crops are grown in a tiered layout. That means that the bottom crops have to deal with hand-me-down water."},
                            "hydroponics": {maintenence: 5, construction: 25, utils: 130, symbol: "🌾4", name: "Hydroponic Farm", flavor_text: "Making food from water with science! Or magic..."}
                        },
                        "health": {
                            "clinic": {maintenence: 2, construction: 6, utils: 20, symbol: "💊1", name: "Clinic", flavor_text: "A small clinic for your flus and infections"},
                            "district-hospital": {maintenence: 4, construction: 12, utils: 60,  symbol: "💊2", name: "Hospital", flavor_text: "A larger hospital to handle cases of accidental microwaving by owner and sunflower seed overdose."},
                            "regional-hospital": {maintenence: 6, construction: 20, utils: 150,  symbol: "💊3", name: "Regional Hospital", flavor_text: "Handles cases from the whole region! Has a whole microwaving ward!"}
                        },
                        "security": {
                            "security-office": {maintenence: 1, construction: 5, utils: 15, symbol: "🛡️1", name: "Security Office", flavor_text: "Security for school campuses, public events, and Toffee Fluffybottom's cheese"},
                            "hamstapol-office": {maintenence: 2, construction: 10, utils: 30, symbol: "🛡️2", name: "Hamstapol Office", flavor_text: "A portmanteau of Hamsta and Police, the Hamstapol is the elite policing force of hamsterkind. Not to be confused with their evil cousins, the Hamstapo."},
                            "hamstapol-headquarters": {maintenence: 4, construction: 18, utils: 55, symbol: "🛡️3", name: "Hamstapol HQ", flavor_text: "Here's where their lobotomy and cheese sniffing units are located"},
                            "toffee-bunker": {maintenence: 6, construction: 30, utils: 130, symbol: "🛡️4", name: "Toffee's Bunker", flavor_text: "Grandhamster Toffee likes to frequent these bunkers when she's not making the nuclear bomb. If she enters, make sure to offer her sunflower seeds."}
                            
                        },
                        "education": {
                            "primary-school": {maintenence: 2, construction: 12, utils: 12, symbol: "📚1", name: "Primary School", flavor_text: "For all those little hamsters you have running around."},
                            "high-school": {maintenence: 4, construction: 15, utils: 25, symbol: "📚2", name: "High School", flavor_text: "3 mandatory APs a year. Highest pass rate in the region. Screw you, [insert name of elite human school]!"},
                            "university": {maintenence: 6, construction: 25, utils: 40, symbol: "📚3", name: "University", flavor_text: "Here, you can study Nukeology, taught by professor Fluffybottoms, or any of the other less intersting studies."},
                            "ultra-mega-phd-research-center": {maintenence: 10, construction: 40, symbol: "📚4", utils: 50, name: "Research Center", flavor_text: "Contributing to building the nuke since 1982."}
                        }
                    }

const housing_data = {
    "basic-house": {"cost": 10, "capacity": 2, "symbol": "🏠1", name: "Basic House", flavor_text: "A small house for a small family"}, 
    "upgraded-house": {"cost": 50, "capacity": 6, "symbol": "🏠2", name: "Upgraded House", flavor_text: "Fits three times the hamsters, as long as they don't mind bunking"}, 
    "small-apt": {"cost": 150, "capacity": 15, "symbol": "🏢3", name: "Apartment", flavor_text: "A breeding ground for neighborly disputes. Hope you have a good police system!"}, 
    "lux-apt": {"cost": 350, "capacity": 25, "symbol": "🏢4", name: "Luxury Apartment", flavor_text: "Crystal chandeliers and optimal space usage."},
    "ultra-apt": {"cost": 600, "capacity": 35, "symbol": "🏢5", name: "Ultimate Apartment", flavor_text: "Uses quantum tunneling so that multiple hamsters can occupy the same space. Don't ask me how it works."}}
const importance = {"power": 0.16, "water": 0.28, "food": 0.26, "health": 0.11, "security": 0.11, "education": 0.08}


function choice(list){
    return list[Math.floor(Math.random() * list.length)]
}

function calc_average_with_var(hamster1, hamster2){
    return Math.max((hamster1 + hamster2)/2 + Math.random() * 0.25 - 0.12, 0);
}

function add_to_feed(text){
    feed.shift();
    feed.push(text);
}

function update_feed(){
    const f = document.querySelector("#feed")
    for (let i = 0; i < 5; i++){
        f.querySelector("#feedtext-" + String(i)).textContent = feed[i]
    }
}

function lend_money(borrower, lender, amt){
    if (lender == borrower){
        return;
    }
    borrower.addLender(lender, amt);
    lender.addBorrower(borrower, amt);

    /* add_to_feed(borrower.name + " just borrowed $" + Math.round(amt) + " from " + lender.name)*/
    
}

function new_hamster(hamster1, hamster2){
    let child = new Hamster(choice(hamster_names), 0, 0, 
                                calc_average_with_var(hamster1.obedience, hamster2.obedience),
                                calc_average_with_var(hamster1.work, hamster2.work),
                                calc_average_with_var(hamster1.reproduction, hamster2.reproduction),
                                calc_average_with_var(hamster1.risk, hamster2.risk),
                                [hamster1, hamster2]
                        )
    hamster_list.push(child);
    hamster1.addChild(child);
    hamster2.addChild(child);
    add_to_feed("Congratulations to: " + hamster1.name + " and " + hamster2.name + " on a new baby " + child.name +"!")

}

function add_spouse(hamster1, hamster2){
    if (hamster1 == hamster2){
        return
    }
    hamster1.setSpouse(hamster2);
    hamster2.setSpouse(hamster1);
    add_to_feed("Married! " + hamster1.name + " and " + hamster2.name + "!");
    return true;
}



class Hamster{
    constructor(name, money, age, obedience, work, reproduction, risk, parents){
        this.name = name;
        this.money = money;
        this.age = age;
        this.obedience = obedience; // 0-1, the higher the less likely to rebel
        this.work = work; // 0-1, the higher the more hardworking
        this.reproduction = reproduction; // 0-1, the higher the more willing to reproduce
        this.risk = risk; // 0-1, the higher the more random

        this.happiness = 100;
        this.parents = parents

        this.acceptable_wage = minimum_wage + (this.money * 0.01) + (minimum_wage * 0.01 * Math.random() * this.risk)
        this.skill = this.age * Math.random();
        this.employed = false;

        this.children = [];
        this.dependant_children = [];
        this.spouse = null;
        this.preferred_children = Math.max(1, Math.round(preferred_children + (this.reproduction * 2 - 1) +( this.risk * Math.random() * 2 - 1)))

        if (hamster_list.length < 10){
            this.preferred_children += 3
        }

        this.canReproduce = false;
        this.canWork = false;
        this.rebellion = false;
        this.tooRich = false;

        this.money_lender = null;
        this.money_owed = 0;
        this.borrowers = new Map();

        this.table_entry = document.createElement("tr");
        this.table_entry.id = "row"

        this.tax_payable = 0;
        this.has_house = false;

        if (this.age >= 18){
            this.image = "hamster.png"
        }
        else{
            this.image = "baby_hamster.png"
        }
        


        this.table_entry.innerHTML = `<td><img src="` + this.image + `" class="icon"></td>
                        <td class="name">` + this.name + `</td>
                        <td class="age">` + this.age + `</td>
                        <td class="money">$` + Math.round(this.money) + `</td>
                        <td class="children">` + this.children.length + `</td>
                        <td class="happiness">` + this.happiness + `</td>
                        <td class="employed">` + this.employed + `</td>`
        document.querySelector("#hamster-table").appendChild(this.table_entry);
        



        
    }

    doWork(){
        if (this.canWork){
            if (this.employed){
                if ((1 + this.skill/100) * (1 + this.work) * minimum_wage >= this.acceptable_wage){
                    if (this.rebellion){
                        this.money += this.acceptable_wage * (cpi * 0.8);
                    }
                    else{
                        this.money += this.acceptable_wage * (cpi * 0.8) * (1-tax);
                        this.tax_payable += this.acceptable_wage * (cpi * 0.8) * tax;
                    }
                    
                    this.skill += this.work * 2 * Math.random();
                    
                    this.happiness = Math.min(this.happiness + 5, 100)
                }

                else if ((1 + this.skill/100) * (1 + this.work) * minimum_wage >= this.acceptable_wage*0.85){
                    if (this.rebellion){
                        this.money += this.acceptable_wage * cpi * 0.85 * 0.8;
                    }
                    else{
                        this.money += this.acceptable_wage * cpi * 0.85 * 0.8 * (1-tax);
                        this.tax_payable += this.acceptable_wage * (cpi * 0.8) * tax * 0.85;
                    }

                    this.skill += this.work * 1.7 * Math.random();
                    if (this.happiness >= 85){
                        this.happiness = Math.max(this.happiness - 5, 85)
                    }

                    
                }
                else{
                    if (this.happiness >= 60){
                        this.happiness = Math.max(this.happiness - 8, 60)
                    }
                    
                    this.employed = false;
                }
            }
            else{
                if (this.happiness >= 60){
                    this.happiness = Math.max(this.happiness - 10, 60)
                }
            }
        }
        

        // console.log(this.name, this.money, "after work")
        
        
        
    }

    getGdpContribution(){
        if (this.employed){
            if (totalMoney >= 0){
                return (1 + this.skill/100) * (1 + this.work) * minimum_wage * Math.min(1, (available_utility/hamster_list.length)/hamster_utility_use);
            }
            else{
                return (1 + this.skill/100) * (1 + this.work) * minimum_wage * Math.min(1, (available_utility/hamster_list.length)/hamster_utility_use) * Math.max(0.5, 1 - Math.abs(totalMoney) * 0.005);
            }
            
        }
        else{
            return 0;
        }
    }

    doPassiveWork(){
        if (this.age < 18){
            this.skill += Math.random() * (5 * this.work);

        }
        else{
            this.skill = Math.min(100, this.skill + Math.random() * (2.5 * this.work))
        }

        if (this.money > 500){
            this.money *= (1 + (interest * 0.05) + (this.skill * 0.001 - 0.0005) * (1-tax))
            this.tax_payable += (1 + (interest * 0.05) + (this.skill * 0.001 - 0.0005)) * tax
        }
    }

    reproduce(){
        if (this.children.length < this.preferred_children){
            if (hamster_list.length < population_cap){
                if (this.isWillingToReproduce()){
                    if (this.spouse == null){
                        for (let i = 0; i<200; i++){
                            let spouse = choice(hamster_list)
                            if (spouse.isWillingToReproduce() && spouse !== this && spouse.spouse === null){
                                let res = add_spouse(this, spouse);
                                if (res){
                                    new_hamster(this, this.spouse);
                                    break;
                                }
                                
                                
                                
                            }
                        }
                    }
                    else{
                        
                        if (this.spouse.isWillingToReproduce()){
                            new_hamster(this, this.spouse);
                            
                        }
                    }
                }
            }
        }
        
        
        
    }

    isWillingToReproduce(){
        if (this.age < 18){
            return false
        }
        else{
            if (this.money < ((base_living_cost * cpi) * (this.dependant_children.length * reproduction_factor - (this.reproduction * Math.random())))){
                return false
            }
            else{
                if (this.happiness < 80){
                    return false
                }
                else{
                    return this.canReproduce;
                }
            }
        }
        
    }

    isWillingToLend(borrower, amount){
        if (this.age < 18 || this.age > 70){
            return false
        }
        else{
            if (borrower.employed && borrower.age < 60){
                if (this.money < base_living_cost * cpi + (this.money + amount) * lending_factor){
                    return false
                }
                else{
                    if (interest > 0.05 + (0.02 * this.risk) - 0.01 + cpi/100){
                        return true
                    }
                    else{
                        return false
                    }
                    
                }
            }
            else{
                return false
            }
            
        }
    }

    spendMoney(){
        if (this.age > 18){
            this.pruneChildren();
            this.money -= base_living_cost * cpi
            for (let child of this.dependant_children){
                this.money -= base_living_cost * cpi * 0.2
            }

            if (this.money > 5*base_living_cost*cpi){
                this.money -= this.money * (0.05 + (this.risk * 0.025 - 0.0125))
            }
        }
        

        if (this.money < base_living_cost * cpi * 0.2 - interest * this.money && this.age > 25){
            this.borrowMoney()

            
        }
        else if (this.money > base_living_cost * cpi * 1.1 && this.money_lender !== null && this.money_owed > 0){
            let payment = Math.min(this.money - base_living_cost * cpi * 1.1, this.money_owed)
            this.money_lender.receiveLoanPayment(this, payment)
            this.money -=  payment
            this.money_owed -= payment

            
        }

        // console.log(this.name, this.money, "after spending")
    }

    borrowMoney(){
        if (this.money_lender === null){
            for (let i = 0; i<200; i++){
                let it = choice(hamster_list);
                if (it.isWillingToLend(this, base_living_cost * cpi - this.money) && it !== this && it !== this.spouse){
                    
                    lend_money(this, it, base_living_cost * cpi - this.money)
                    
                    break;
                }
            }
        }
        else{
            if (this.money_lender.isWillingToLend(this, base_living_cost * cpi - this.money)){
                /* add_to_feed(this.name + " just borrowed $" + Math.round(base_living_cost * cpi - this.money) + " from " + this.money_lender.name)*/
                lend_money(this, this.money_lender, base_living_cost * cpi - this.money)
                
            }
        }
            
        
    }

    updateBorrowedInterest(){
        this.money_owed *= (1 + interest);
    }

    updateLentInterest(){
        for (let [hamster, amt] of this.borrowers){
            this.borrowers.set(hamster, amt*(1 + interest));
        }
    }

    transferLoans(recipient){
        for (let [borrower, amt] of this.borrowers) {
            borrower.money_lender = recipient;
        }

        for (let [borrower, amt] of this.borrowers) {
            recipient.borrowers.set(borrower, amt);
        }

        this.borrowers.clear();
    }


    setSpouse(hamster){
        this.spouse = hamster;
        this.happiness = Math.min(100, this.happiness + 10)
    }



    addChild(child){
        this.canReproduce = false;
        this.children.push(child);
        this.dependant_children.push(child);
        this.happiness = Math.min(100, this.happiness + 15)
    }

    

    annualUpdate(){
        if (this.age > 18 && this.age < 65){
            this.canWork = true;
            this.canReproduce = true;
        }
        if (this.money > cpi * base_living_cost*50 - (this.risk * cpi) + (this.children.length * cpi) + (this.obedience * 3 * cpi)){
            this.canWork = false;
            this.employed = false;
            this.tooRich = true;
        }
        else if (this.money < cpi * base_living_cost*30 - (this.risk * cpi) + (this.children.length * cpi) + (this.obedience * 3 * cpi)){
            this.tooRich = false;
        }

        this.acceptable_wage = minimum_wage + (this.money * 0.01) + (minimum_wage * 0.01 * Math.random() * this.risk)

    }

    updateEmployment(val){
        this.employed = val;
    }

    pruneChildren(){
        let c = this.dependant_children.slice()
        for (let child of c){
            if (child.age >= 18){
                let ind = this.dependant_children.indexOf(child);
                this.dependant_children.splice(ind, 1);
            }
        }
    }

    checkDeath(){
        if (Math.floor(Math.random() * (100 - this.age)) <= 0 && this.age > 45){
            let ind = hamster_list.indexOf(this);
            hamster_list.splice(ind, 1);
            add_to_feed("Rest in peace " + this.name + ". You will be missed.")
            this.table_entry.remove();
            // console.log(this.name, "dead")
            if (this.money > 0){
                if (this.money_lender !== null){
                    this.money_lender.receiveFinalLoanPayment(this, Math.min(this.money_owed, this.money))
                    this.money -= Math.min(this.money_owed, this.money)
                }
                
                if (inheritance_tax){
                    
                    pretax += this.money * tax
                    this.money *= (1-tax)
                    
                }
                for (let child of this.children){
                    child.receiveInheritanceParent(Math.floor(this.money/(this.children.length + 1)), this)
                }
            
                    
                
                if (this.spouse != null){
                    this.spouse.receiveInheritanceSpouse(Math.floor(this.money/(this.children.length + 1)))
                }
            }

            if (this.spouse !== null){
                this.transferLoans(this.spouse);
            }
            else{
                for (let [borrower, amt] of this.borrowers) {
                    borrower.money_lender = null;
                    borrower.money_owed = 0;
                }
                this.borrowers.clear();
            }
            

            

        }
        
    }

    receiveInheritanceParent(amt, parent){
        this.money += amt;
        let ind = this.parents.indexOf(parent);
        this.parents.splice(ind, 1);
    }

    receiveInheritanceSpouse(amt){
        this.money += amt;
        this.spouse = null;
    }

    updateHappiness(){
        if (! grace_period){
            if (available_utility/hamster_list.length < hamster_utility_use){
                this.happiness = Math.max(0, this.happiness - (hamster_utility_use - (available_utility/hamster_list.length)))
            }
                

                /* 
                if (available_amenity/hamster_list.length < hamster_amenity_use){
                    if (this.happiness > 40){
                        this.happiness = Math.max(40, this.happiness - (hamster_amenity_use - (available_amenity/hamster_list.length)))
                    }
                    
                }
                else{
                    if (this.happiness < 75){
                        this.happiness = Math.min(75, this.happiness + 5)
                    }
                    
                }*/

            this.happiness = Math.max(40, this.happiness - tax * 5) // Begrudgingly pay the taxes
        }
        

        
    }
    checkRebel(){
        if (this.age > 25){
            if (this.happiness < 30 - 10*this.obedience || (this.money < 0 && this.employed) || (! this.has_house && Math.random() < 0.25)){
                this.rebellion = true
                this.happiness = 0;
            }
            else if (this.happiness > 45 - 10*this.obedience && this.has_house){
                this.rebellion = false;
            }
        }
        
    }

    updateTableEntry(){

        if (this.age < 18){
            this.image = "baby_hamster.png"
        }
        else if (this.age > 18 && 65 > this.age){
            this.image = "hamster.png"
        }
        else{
            this.image = "elder_hamster.png"
        }

        this.table_entry.querySelector(".icon").src = this.image
        this.table_entry.querySelector(".name").textContent = this.name;
        this.table_entry.querySelector(".age").textContent = this.age;
        this.table_entry.querySelector(".money").textContent = "$" + Math.round(this.money);
        this.table_entry.querySelector(".children").textContent = this.children.length;
        this.table_entry.querySelector(".happiness").textContent = Math.round(this.happiness);

        
        if (this.rebellion){
            this.table_entry.querySelector(".employed").textContent = "rebelling"
            
        }
        else{
            if (this.tooRich){
                this.table_entry.querySelector(".employed").textContent = "Too rich to work";
            }
            else{
                this.table_entry.querySelector(".employed").textContent = this.employed;
            }
            
        }

        
    }

    addBorrower(hamster, amount){
        if (this.borrowers.has(hamster)){
            this.borrowers.set(hamster, this.borrowers.get(hamster) + amount)
            this.money -= amount;
        }
        else{
            this.borrowers.set(hamster, amount)
            this.money -= amount;
        }
    }

    addLender(hamster, amount){
        if (hamster == this.money_lender){
            this.money_owed += amount;
            this.money += amount
        }
        else{
            this.money_lender = hamster
            this.money_owed = amount;
            this.money += amount;
        }
    }

    receiveLoanPayment(hamster, amt){
        let remaining_loan = Math.max(0, owed - amt)
        let owed = this.borrowers.get(hamster) || 0
        this.borrowers.set(hamster, remaining_loan);
        this.money += amt;

        if (remaining_loan <= 0){
            this.borrowers.delete(hamster)

        }
    }

    receiveFinalLoanPayment(hamster, amt){
        this.borrowers.delete(hamster);
        this.money += amt;
    }

    payTaxes(){
        let prev = this.tax_payable;
        this.tax_payable = 0;
        return prev
        
        
    }


    update(){
        this.age ++
        this.annualUpdate()
        this.checkDeath()
        this.doPassiveWork()
        this.doWork()
        this.spendMoney()
        this.reproduce()
        this.updateHappiness()
        this.checkRebel()


        this.updateTableEntry();


    }

    reportWorkType(){
        if (this.age < 18){
            n_children ++
        }
        else{
            if (this.rebellion){
                n_rebelling ++
                
            }
            else{
                if (this.tooRich){
                    n_rich ++
                }
                else{
                    if (this.employed){
                        n_employed ++
                    }
                    else{
                        n_unemployed ++
                    }
                }
                
            }
        }
        
    }
}

class Housing{
    constructor(){
        this.level = 0;
        this.type = Object.keys(housing_data)[this.level];
        this.maxLevel = Object.keys(housing_data).length - 1;
        this.dom_pos = visual_city.addBuilding(this.type, this)
    }

    upgradeHouse(){
        this.level ++;
        this.type = Object.keys(housing_data)[this.level];
        visual_city.updateBuilding(this.dom_pos[0], this.dom_pos[1], this.type)
        return housing_data[this.type]["cost"];
    }

    getUpgradeCost(){
        if (this.level < this.maxLevel){
            let next_type = Object.keys(housing_data)[this.level+1];
            return housing_data[next_type]["cost"];
        }
        else{
            return null;
        }
    }

    getCapacityContribution(){
        return housing_data[this.type]["capacity"]
    }

    getToolTip(){
        return `<h1>` + housing_data[this.type]["name"] + `</h1>
                <hr>
                <p>Capacity: ` + housing_data[this.type]["capacity"] + `</p>
                <p id="quotation">"` +  housing_data[this.type]["flavor_text"] + `"</p>
                <button id="delete-building-button" onclick="visual_city.objects[${this.dom_pos[1]}][${this.dom_pos[0]}].delete()">Delete Building (Cannot be undone)</button>
                <button id="delete-all-building-button" onclick="deleteAllHousingBuildings(${this.level})">Delete All LV. ${this.level+1} housing units (Cannot be undone)</button>
                <button id="close" onclick="document.querySelector('#tooltip-box').style.display = 'none'">Close</button>`
    }

    delete(){
        let ind = house_list.indexOf(this);
        house_list.splice(ind, 1);
        document.querySelector("#tooltip-box").style.display = "none";
        visual_city.deleteBuilding(this.dom_pos[0], this.dom_pos[1]);
        this.dom_pos = null;
    }

    getLogo(){
        return housing_data[this.type]["symbol"]
    }

}

class UtilityBuilding{
    constructor(type){
        this.level = 0;
        this.category = type;
        this.type = Object.keys(necessity_data[this.category])[this.level];
        
        this.maxLevel = Object.keys(necessity_data[this.category]).length - 1;
        this.health = 15

        this.dom_pos = visual_city.addBuilding(this.type, this);
        console.log("new utility", type, this.dom_pos)

        

    }

    upgradeUtility(){
        if (this.level < this.maxLevel){
            this.level ++;
            this.type = Object.keys(necessity_data[this.category])[this.level];
            visual_city.updateBuilding(this.dom_pos[0], this.dom_pos[1], this.type)
        }
        else{
            return
        }
        
    }

    getUpgradeCost(){
        if (this.level < this.maxLevel){
            let next_type = Object.keys(necessity_data[this.category])[this.level+1];
            return necessity_data[this.category][next_type]["construction"];
        }
        else{
            return null;
        }
    }

    getMaintenenceCost(){
        return necessity_data[this.category][this.type]["maintenence"];
    }

    getCapacityContribution(){
        return necessity_data[this.category][this.type]["utils"]
    }
    
    repair(){
        this.health = 15;
    }

    damage(){
        this.health -= Math.random() * 3

        if (this.health < 0){
            let ind = utilities_list.indexOf(this);
            utilities_list.splice(ind, 1);
            add_to_feed("Boom! A " + this.category + " building has just exploded due to lack of maintenence.")
            visual_city.deleteBuilding(this.dom_pos[0], this.dom_pos[1])
            console.log("removed", this.dom_pos[0], this.dom_pos[1])
            this.dom_pos = null;
            
        }
        

    }

    getToolTip(){
        return `<h1>` + necessity_data[this.category][this.type]["name"] + `</h1>
                <hr>
                <p>Utility Points Provided: ` + necessity_data[this.category][this.type]["utils"] + `</p>
                <p>Building Health: ` + Math.round(this.health) + `</p>
                <p id="quotation">"` +  necessity_data[this.category][this.type]["flavor_text"] + `"</p>
                <button id="delete-building-button" onclick="visual_city.objects[${this.dom_pos[1]}][${this.dom_pos[0]}].delete()">Delete Building (Cannot be undone)</button>
                <button id="delete-all-building-button" onclick="deleteAllUtilityBuildings('${this.category}', ${this.level})">Delete All LV. ${this.level + 1} ${this.category} buildings (Cannot be undone)</button>
                <button id="close" onclick="document.querySelector('#tooltip-box').style.display = 'none'">Close</button>`
    }

    delete(){
        let ind = utilities_list.indexOf(this);
        utilities_list.splice(ind, 1);
        visual_city.deleteBuilding(this.dom_pos[0], this.dom_pos[1]);
        document.querySelector("#tooltip-box").style.display = "none";
    }

    getLogo(){
        return necessity_data[this.category][this.type]["symbol"]
    }



}

class VisualCityGrid{
    constructor(size){
        this.occupied = new Map()
        this.objects = []
        this.occupied.set("0,0", "entrance")
        let g = document.querySelector("#grid");
        for (let y = 0; y < size; y++){
            let row = document.createElement("div");
            row.className = "cityRow"

            city_grid.push([])
            this.objects.push([])
            g.appendChild(row);
            for (let x = 0; x < size; x++){
                let item = document.createElement("div");
                item.className = "cityBlock"
                item.addEventListener("click", () => this.squareClicked(x, y))
                city_grid[city_grid.length - 1].push(item)
                row.appendChild(item);
                this.objects[this.objects.length - 1].push(null)
            }
        }
        this.objects[0][0] = "entrance"
        this.available_positions = new Set(["1,0", "1,1", "0,1"])




        
    }

    getNewPositionForBuilding(){
        while (this.available_positions.size > 0){
            let item = choice(Array.from(this.available_positions)).split(",").map(Number)
            this.available_positions.delete(item[0] + "," + item[1])
            if (! this.occupied.has(item[0] + "," + item[1])){
                if (item[0] + 1 < grid_size && !(this.occupied.has((item[0] + 1) + "," + item[1]))){
                    this.available_positions.add((item[0] + 1) + "," + item[1])
                }
                if (item[0] - 1 >= 0 && !(this.occupied.has((item[0] - 1) + "," + item[1]))){
                    this.available_positions.add((item[0] - 1) + "," + item[1])
                    
                }
                if (item[1] + 1 < grid_size && !(this.occupied.has(item[0] + "," + (item[1] + 1)))){
                    this.available_positions.add(item[0] + "," + (item[1] + 1))

                }
                if (item[1] - 1 >= 0 && !(this.occupied.has(item[0] + "," + (item[1] - 1)))){
                    this.available_positions.add(item[0] + "," + (item[1] - 1))
                }
                return item
            }
            
        }
        return [null, null]
    }

    updateBuilding(x, y, type){
        this.occupied.set(x + "," + y, type)
    }

    addBuilding(type, item){
        let pos = this.getNewPositionForBuilding();

        if (pos[0] === null) {
            return;
        }
        this.occupied.set(pos[0] + "," + pos[1] , type)
        this.objects[pos[1]][pos[0]] = item;

        return [pos[0], pos[1]]
    }

    deleteBuilding(x, y){
        this.occupied.delete(x + "," + y)
        city_grid[y][x].className = "cityBlock"
        city_grid[y][x].textContent = ""
        this.available_positions.add(x + "," + y)
        this.objects[y][x] = null;

    }

    draw(){
        for (let spot of this.occupied.keys()){

            let type = this.occupied.get(spot);
            let numspot = spot.split(",").map(Number)
            const x = numspot[0]
            const y = numspot[1]

            city_grid[y][x].className = "cityBlock " + type
            if (this.objects[y][x] !== "entrance"){
                city_grid[y][x].textContent = (this.objects[y][x]).getLogo();
            }
            
            
        }

    }

    checkNewBuildingPossible(){
        return this.available_positions.size > 0;
    }

    squareClicked(x, y){
        if (this.objects[y][x] !== null && this.objects[y][x] !== "entrance"){
            let tooltip = this.objects[y][x].getToolTip();
            document.querySelector("#tooltip-box").style.display = "block";
            document.querySelector("#tooltip-box").innerHTML = tooltip;

        }

    }

    getFilled(){
        return (this.available_positions.size === 0);
    }


}

function collect_taxes(){
    thisYearMoney = 0;
    thisYearMoney += pretax;
    pretax = 0;
    for (let hamster of hamster_list){
        thisYearMoney += hamster.payTaxes();


    }

    totalMoney += thisYearMoney;

}

function update_hamster_indicators(){
    n_children = 0;
    n_rebelling = 0;
    n_employed = 0;
    n_unemployed = 0;
    n_rich = 0;

    for (let hamster of hamster_list){
        hamster.reportWorkType();
    }

    document.querySelector("#employed-indicator").textContent = "Employed: " + n_employed;
    document.querySelector("#unemployed-indicator").textContent = "Unemployed: " + n_unemployed;
    document.querySelector("#children-indicator").textContent = "Children: " + n_children;
    document.querySelector("#rebelling-indicator").textContent = "Rebelling: " + n_rebelling;
    document.querySelector("#rich-indicator").textContent = "Rich: " + n_rich;
}

function update_globals(){
    checkHousingStatus();
    checkUtilitiesStatus();
    let new_gdp = 0;
    for (let hamster of hamster_list){
        new_gdp += hamster.getGdpContribution();
    }

    gdp.push(new_gdp);
    gdp.shift(); // Real GDP

    let short_term_real_gdp_delta;
    let long_term_real_gdp_delta;

    if (gdp[gdp.length - 2] == 0){
        short_term_real_gdp_delta = 0
    }
    else{
        short_term_real_gdp_delta = (gdp[gdp.length - 1] - gdp[gdp.length - 2])/gdp[gdp.length - 2]
    }
    
    if (gdp[0] == 0){
        long_term_real_gdp_delta = 0
    }
    else{
        long_term_real_gdp_delta = (gdp[gdp.length - 1]  - gdp[0])/gdp[0]
    }




    let cyclical_unemployment = Math.min(0.35, Math.max(0, 0.1 - 0.1 * (short_term_real_gdp_delta * 0.2 + long_term_real_gdp_delta * 0.8)))
    unemployment.push(natural_unemployment + cyclical_unemployment)
    unemployment.shift()

    
    cpi += unemployment[1] - unemployment[0] + 0.1 * (inflation_factor - 1) * (hamster_list.length * 0.0005)
    cpi += (1 - cpi) * 0.05
    cpi = Math.max(0.2, cpi)

    inflation_factor = Math.max(1, inflation_factor/1.1)

    let productivity_list = hamster_list.slice()


    productivity_list.sort(function(a, b){return b.skill - a.skill})
    productivity_list = productivity_list.filter(function(v){return v.canWork})

    for (let i = 0; i < productivity_list.length; i++){
        if (i < Math.ceil(productivity_list.length * (1-unemployment[1]))){
            productivity_list[i].updateEmployment(true);
        }
        else{
            productivity_list[i].updateEmployment(false);
        }

    }

    update_hamster_indicators();
    collect_taxes();
    spendGovMoney();

    document.querySelector("#gov-revenue-indicator").textContent = "$" + Math.round(thisYearMoney);
    document.querySelector("#gov-reserve-indicator").textContent = "$" + Math.round(totalMoney); 

}

function printMoney(){
    for (let hamster of hamster_list){
        hamster.money += 100
    }
    inflation_factor += 5;

    
}

function simulate(){
    
    update_globals()
    let h_list_copy = hamster_list.slice()
    for (let hamster of h_list_copy){
        hamster.update(); 
        
    }

    update_feed();
    updateGlobalIndicators();
    visual_city.draw();
    generate_chatter();

    if (visual_city.getFilled()){
        document.querySelector("#building-filled-notice").textContent = "Notice! All building spots are filled. Demolish buildings to build more!"
    }
    else{
        document.querySelector("#building-filled-notice").textContent = ""
    }
    

}

function checkHousingStatus(){
    housing_supply = 0
    for (let house of house_list){
        housing_supply += house.getCapacityContribution();
    }


    let housing_list = hamster_list.slice()
    housing_list = housing_list.filter(function(v){return v.age > 18})
    housing_list.sort(function(a, b){return b.money - a.money})

    for (let i = 0; i<housing_list.length; i++){
        if (i < housing_supply){
            housing_list[i].has_house = true;
        }
        else{
            housing_list[i].has_house = false;
        }
    }

    document.querySelector("#housing-supply").textContent = housing_supply
    if (housing_supply >= housing_list.length){
        document.querySelector("#housing-filled-indicator").innerHTML = `Enough Housing?: <b><span class="positive">True</span></b>`
    }
    else{
        document.querySelector("#housing-filled-indicator").innerHTML = `Enough Housing?: <b><span class="negative">False</span></b>`
    }
    

}

function checkUtilitiesStatus(){
    for (let category of Object.keys(available_cat_utility)){
        available_cat_utility[category] = 0
    }

    for (let utility of utilities_list){
        available_cat_utility[utility.category] += utility.getCapacityContribution()
    }

    
    available_utility = 0;
    for (let category of Object.keys(available_cat_utility)){
        let weight = importance[category];
        available_utility += available_cat_utility[category] * weight
    }

    document.querySelector("#utility-supply").textContent = Math.round(available_utility);
    document.querySelector("#utility-demand").textContent = hamster_list.length * hamster_utility_use;

    if (available_utility >= hamster_list.length * hamster_utility_use){
        document.querySelector("#utility-filled-indicator").innerHTML = `Enough Utilities?: <b><span class="positive">True</span></b>`
    }
    else{
        document.querySelector("#utility-filled-indicator").innerHTML = `Enough Utilities?: <b><span class="negative">False</span></b>`
    }


    
}

function updateGlobalIndicators(){
    document.querySelector("#pop-indicator").textContent = hamster_list.length;
    document.querySelector("#gdp-indicator").textContent = Math.round(gdp[gdp.length - 1]);
    document.querySelector("#cpi-indicator").textContent = Math.round(cpi * 100)/100

    
}

function createNewHousing(budget){
    const curr_houses = house_list.slice();
    let housing_demand_list = hamster_list.slice()
    housing_demand_list = housing_demand_list.filter(function(v){return v.age > 18})
    let deficit_ratio = (housing_demand_list.length - housing_supply)/housing_demand_list.length

    let remaining_money = budget

    if (deficit_ratio > 0.1){
        if (curr_houses.length > 0){
            for (let house of curr_houses){
                let c = house.getUpgradeCost()
                if (c !== null){
                    c *= cpi;
                    if (remaining_money - c >= 0){
                        remaining_money -= c
                        house.upgradeHouse();
                    }
                    else{
                        while (remaining_money >= 10 * cpi && visual_city.checkNewBuildingPossible()){
                            house_list.push(new Housing())
                            remaining_money -= 10 * cpi
                        }
                    }
                }
                
            
                

            }
        }
        else{
            while (remaining_money > 0){
                if (visual_city.checkNewBuildingPossible() && remaining_money >= 10 * cpi){
                    house_list.push(new Housing())
                    remaining_money -= 10 * cpi
                }
                else{
                    break
                }
            }
        }

        
    }
    else if (deficit_ratio > 0.04){
        for (let house of curr_houses){
            let c = house.getUpgradeCost()
            if (c !== null){
                c *= cpi;
                if (remaining_money - c < 0 && remaining_money - (10 * cpi) > 0  && visual_city.checkNewBuildingPossible()){
                    house_list.push(new Housing())
                }
                else if(remaining_money - c > 0 && remaining_money - (10 * cpi) < 0){
                    remaining_money -= c
                    house.upgradeHouse();
                }
                else if (remaining_money - c > 0 && remaining_money - (10 * cpi) > 0){
                    if (Math.random() < 0.5  && visual_city.checkNewBuildingPossible()){
                        house_list.push(new Housing())
                    }
                    else{
                        house.upgradeHouse();
                        remaining_money -= c
                    }
                }
                
                else{
                    document.querySelector("#housing-extra-money-indicator").textContent = "$" + Math.round(remaining_money*100)/100;
                    return remaining_money
                }
            }
            
            for (let i = 0; i < Math.floor(remaining_money/(10 * cpi)); i++){
                if (visual_city.checkNewBuildingPossible()){
                    house_list.push(new Housing())
                    remaining_money -= (10 * cpi);
                }
                
            }
            

        }
        document.querySelector("#housing-extra-money-indicator").textContent = "$" + Math.round(remaining_money*100)/100;
        return remaining_money
        

    }
    else{
        while (remaining_money > 0){
            if (visual_city.checkNewBuildingPossible() && remaining_money >= 10 * cpi){
                house_list.push(new Housing())
                remaining_money -= 10 * cpi
            }
            else{
                let house = choice(house_list)
                let c = house.getUpgradeCost()

                if (c !== null){
                    c *= cpi
                    if (remaining_money >= c){
                        house.upgradeHouse()
                        remaining_money -= c
                    }
                    else{
                        break
                    }
                }
                else{
                    break
                }
            }
        }
    }
    document.querySelector("#housing-demand").textContent = housing_demand_list.length
    document.querySelector("#housing-extra-money-indicator").textContent = "$" + Math.round(remaining_money*100)/100;

    return remaining_money
}

function maintainUtilities(budget){
    let money_left = budget
    let tcost = 0
    if (! grace_period){
        let warning_needed = false
        
        for (let utility of utilities_list){
            let mcost = utility.getMaintenenceCost();
            tcost += mcost;
            
            if (money_left - mcost >= 0){
                utility.repair()
                money_left -= mcost
            }
            else{
                utility.damage();
                warning_needed = true;

            }
        }

        if (warning_needed){
            add_to_feed("Warning! Utilities are falling into disrepair due to insufficient budget")
        }
        
        
    }

    document.querySelector("#repair-cost-indicator").textContent = "$" + Math.round(tcost * 100) / 100
    // document.querySelector("#repair-cost-actual-indicator").textContent = "Money Provided for Maintaining Utilities: $" + Math.round((budget - money_left) * 100) / 100
    
    return budget - money_left;
}

function createNewUtilities(budget){
    let money_left = budget
    money_left -= maintainUtilities(budget);
    while (money_left > 0){
        checkUtilitiesStatus();
        let sorted_available_cat_utility = Object.fromEntries(Object.entries(available_cat_utility).sort(([,a],[,b]) => a-b));
        let needed_cat = Object.keys(sorted_available_cat_utility)[0]
        let cat_items = utilities_list.filter(function(item){return item.level < item.maxLevel && item.category == needed_cat})
        
        if (cat_items.length > 0){
            if (Math.random() < 0.5){
            
                let cost = necessity_data[needed_cat][Object.keys(necessity_data[needed_cat])[0]]["construction"] * cpi
                if (money_left - cost >= 0 && visual_city.checkNewBuildingPossible()){
                    utilities_list.push(new UtilityBuilding(Object.keys(sorted_available_cat_utility)[0]))
                    money_left -= cost;
                }
                else{
                    let it = choice(cat_items)
                    cost = it.getUpgradeCost() * cpi;
                    if (money_left - cost >= 0){
                        it.upgradeUtility()
                        money_left -= cost
                    }
                    else{
                        document.querySelector("#extra-money-indicator").textContent = "$" + Math.round((money_left) * 100) / 100
                        return money_left
                    }
                }
                

            }
            else{
                let it = choice(cat_items)
                let cost = it.getUpgradeCost() * cpi;
                if (money_left - cost >= 0){
                    it.upgradeUtility()
                    money_left -= cost
                }
                else{
                    let cost = necessity_data[needed_cat][Object.keys(necessity_data[needed_cat])[0]]["construction"] * cpi
                    if (money_left - cost >= 0 && visual_city.checkNewBuildingPossible()){
                        utilities_list.push(new UtilityBuilding(Object.keys(sorted_available_cat_utility)[0]))
                        money_left -= cost;
                    }
                    else{
                        document.querySelector("#extra-money-indicator").textContent = "$" + Math.round((money_left) * 100) / 100
                        return money_left
                    }
                }
            }
                

        }
        else{
            let cost = necessity_data[needed_cat][Object.keys(necessity_data[needed_cat])[0]]["construction"] * cpi
            if (money_left - cost >= 0 && visual_city.checkNewBuildingPossible()){
                utilities_list.push(new UtilityBuilding(Object.keys(sorted_available_cat_utility)[0]))
                money_left -= cost;
            }
            else{
                document.querySelector("#extra-money-indicator").textContent = "$" + Math.round((money_left) * 100) / 100
                return money_left
            }
        }
        
    }
    document.querySelector("#extra-money-indicator").textContent = "$" + Math.round((money_left) * 100) / 100
    return money_left
    
}


function spendGovMoney(){
    let public_necessity_spending = thisYearMoney * public_necessity_portion;
    let rd_spending = thisYearMoney * rd_portion;
    let housing_spending = thisYearMoney * housing_portion;

    
    housing_money_left = createNewHousing(Math.min(10000, (housing_spending+ Math.max(0, housing_money_left) * 0.9)));
    
    
    totalMoney -= housing_spending;
    thisYearMoney -= housing_spending;
    
    util_money_left = createNewUtilities(Math.min(10000, (public_necessity_spending + Math.max(0, util_money_left) * 0.9)));
    totalMoney -= public_necessity_spending;
    thisYearMoney -= public_necessity_spending;
    
    

    totalMoney -= rd_spending;
    thisYearMoney -= rd_spending;

    document.querySelector("#hspend-indicator").textContent = "$" + Math.round(housing_spending*100)/100
    document.querySelector("#uspend-indicator").textContent = "$" + Math.round(public_necessity_spending*100)/100
    // document.querySelector("#rdspend-indicator").textContent = "    Research and Development Spending: $" + Math.round(rd_spending*100)/100


}

function generate_chatter(){
    if (available_utility/hamster_list.length < hamster_utility_use){
        if (Math.random() < 0.05){
            add_to_feed(choice(hamster_commentary["utility_complaints"]))
        }
        
    }
    else{
        if (Math.random() < 0.05){
            add_to_feed(choice(hamster_commentary["utility_complements"]))
        }
    }

    if (tax > 0.2){
        if (Math.random() < 0.01){
            add_to_feed(choice(hamster_commentary["tax_complaints"]))
        }
    }
    else if (tax <= 0.2 && tax > 0.01){
        if (Math.random() < 0.01){
            add_to_feed(choice(hamster_commentary["tax_neutral"]))
        }
    }
    else{
        if (Math.random() < 0.01){
            add_to_feed(choice(hamster_commentary["tax_complements"]))
        }
    }

    if (Math.random() < 0.05){
        add_to_feed(choice(hamster_commentary["random"]))
    }
}

function startGame(){
    setTimeout(function(){grace_period=false}, 10000)
    document.querySelector("#blur").remove();
    document.querySelector("#onboarding-tip").remove();
    document.removeEventListener("click", startGame)
}


function checkUnlock(){
    if (hamster_list.length >= 15 && ! category_controls_unlocked){
        document.querySelector("#gov-spending-disable").remove();
        category_controls_unlocked = true
    }

    if (hamster_list.length >= 100 && ! pm_unlocked){
        document.querySelector("#print-money").textContent = "Print Money (+$100/Hamster)"
        document.querySelector("#print-money").disabled = false;
    }

}

function deleteAllUtilityBuildings(type, level){
    let utility_copy = utilities_list.slice();
    for (let utility of utility_copy){
        if (utility.level == level && utility.category == type){
            utility.delete();
        }
    }

}

function deleteAllHousingBuildings(level){
    let housing_copy = house_list.slice()
    for (let house of housing_copy){
        if (house.level == level){
            house.delete()
        }
    }
}


const grid = document.querySelector("#grid");

let visual_city = new VisualCityGrid(grid_size);



let adam_hamster = new Hamster("Adam", 100, 18, Math.random(), Math.random(), Math.random(), Math.random(), [null, null])
let eve_hamster = new Hamster("Eve", 100, 18, Math.random(), Math.random(), Math.random(), Math.random(), [null, null])

hamster_list.push(adam_hamster)
hamster_list.push(eve_hamster)

house_list.push(new Housing())

utilities_list.push(new UtilityBuilding("power"))
utilities_list.push(new UtilityBuilding("water"))

document.querySelector("#tax-slider").addEventListener("input", function(){tax=(+document.querySelector("#tax-slider").value/100)})
document.querySelector("#interest-slider").addEventListener("input", function(){interest=(+document.querySelector("#interest-slider").value/100)})
document.querySelector("#print-money").addEventListener("click", printMoney)

document.querySelector("#pn-slider").addEventListener("input", function(){public_necessity_portion=(+document.querySelector("#pn-slider").value/100); savings_portion = 1 - rd_portion - public_necessity_portion - housing_portion; document.querySelector("#s-indicator").textContent = "Savings: " + Math.round(savings_portion * 100) + "%";})
// document.querySelector("#rd-slider").addEventListener("input", function(){rd_portion=(+document.querySelector("#rd-slider").value/100); savings_portion = 1 - rd_portion - public_necessity_portion - housing_portion; document.querySelector("#s-indicator").textContent = "Savings: " + Math.round(savings_portion * 100) + "%";})
document.querySelector("#h-slider").addEventListener("input", function(){housing_portion=(+document.querySelector("#h-slider").value/100); savings_portion = 1 - rd_portion - public_necessity_portion - housing_portion; document.querySelector("#s-indicator").textContent = "Savings: " + Math.round(savings_portion * 100) + "%";})
document.querySelector("#inheritance-tax").addEventListener("input", function(){inheritance_tax=document.querySelector("#inheritance-tax").checked})
document.addEventListener("click", startGame)
setInterval(simulate, 1000)
setTimeout(function(){setInterval(checkUnlock, 1000); document.querySelector("#begin-instructions").textContent = "Click Anywhere to Begin"}, 3000)