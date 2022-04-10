// Creating Environment
const garden = new Entity()
garden.addComponent(new GLTFShape('models/garden.glb'))
garden.addComponent(
    new Transform({
      position: new Vector3(8, 0, 8),
      scale: new Vector3(1.6, 1.6, 1.6)
    })
)

// Creating Npc Constants
const rick = new Entity()
const tony = new Entity()
const miles = new Entity()
const click = "Click Characters for Drinks"
let myCanvas = new UICanvas()
let myText = new UIText(myCanvas)


// Creating Variable
let rickDrink = ""
let rickDescription = ""
let tonyDrink = ""
let tonyDescription = "" 
let milesDrink = ""
let milesDescription = ""

// Adding Character Models
rick.addComponent(new GLTFShape("models/rick/rick.gltf"))
tony.addComponent(new GLTFShape("models/tony/tony.gltf"))
miles.addComponent(new GLTFShape("models/miles/miles.gltf"))

// Adding Entities to Scene
engine.addEntity(rick)
engine.addEntity(miles)
engine.addEntity(tony)
engine.addEntity(garden)

// Setting Character Positions
rick.addComponent(
    new Transform({
      position: new Vector3(5, 0, 5),
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(1.1, 1.1, 1.1),
    })
) 
tony.addComponent(
    new Transform({
      position: new Vector3(8, 0, 5), 
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(1.1, 1.1, 1.1),
    })
)
miles.addComponent(
    new Transform({
      position: new Vector3(11, 0, 5),
      rotation: new Quaternion(0, 0, 0, 0),
      scale: new Vector3(1.1, 1.1, 1.1),
    })
)

// Left Click Reaction
rick.addComponent(
    new OnPointerDown((e) => {
        log("rick was clicked", e)
        myText.value = rickDrink + '\nPress E For Description!'
    },
    {
        button: ActionButton.POINTER,
        showFeedback: true,
        hoverText: "Hello, click for drink name!"
    },
    )
)
tony.addComponent(
    new OnPointerDown((e) => {
        log("Tony was clicked", e)
        myText.value = tonyDrink + "\nPress E For Description!"
    },
    {
        button: ActionButton.POINTER,
        showFeedback: true,
        hoverText: "Hello, click for drink name!"
    }
    )
)
miles.addComponent(
    new OnPointerDown((e) => {
        log("Miles was clicked", e)
        myText.value = milesDrink + "\nPress E For Description!"
    },
    {
        button: ActionButton.POINTER,
        showFeedback: true,
        hoverText: "Hello, click for drink name!"
    }
    )
)

// Button Press Reaction
rick.addComponent(
    new OnPointerUp((e) => {
        log("rick was clicked", e)
        myText.value = rickDescription
    },
    {
        button: ActionButton.PRIMARY,
        showFeedback: true,
    },
    )
)
tony.addComponent(
    new OnPointerUp((e) => {
        log("Tony was clicked", e)
        myText.value = tonyDescription
    },
    {
        button: ActionButton.PRIMARY,
        showFeedback: true,
    }
    )
)
miles.addComponent(
    new OnPointerUp((e) => {
        log("Miles was clicked", e)
        myText.value = milesDescription
    },
    {
        button: ActionButton.PRIMARY,
        showFeedback: true,
    }
    )
)

// Fetching Drink Name From Api
async function getDrink(): Promise<string> {
    const response = await fetch('https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6')
    const json = JSON.parse(await response.text())
    
    //Declaring Value of Variables
    rickDrink = json[0]["name"]
    rickDescription = json[0]["description"]
    tonyDrink = json[5]["name"]
    tonyDescription = json[5]["description"]
    milesDrink = json[8]["name"]
    milesDescription = json[8]["description"]
}

// Setting Text Parameters
myText.value = click
myText.fontSize = 15
myText.height = "50%"
myText.width = "50%"
myText.vAlign = "center"
myText.hAlign = "center"
myText.textWrapping = true

// Calling Function
getDrink()