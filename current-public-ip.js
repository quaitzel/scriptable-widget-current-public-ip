let api = await randomAPI() 
let widget = await createWidget(api) 
 
if (config.runsInWidget) { 
    Script.setWidget(widget) 
}  
else { 
    widget.presentMedium() 
} 
 
Script.complete() 
async function createWidget(api) { 
    let title = "Titel" 
    let widget = new ListWidget() 
    let gradient = new LinearGradient() 
    gradient.locations = [0, 1] 
    gradient.colors = [ 
        new Color("141414"), 
        new Color("13233F") 
    ] 
 
    widget.backgroundGradient = gradient 
 
    let titleStack = widget.addStack() 
 
    titleStack.addSpacer(4) 
    let titleElement = titleStack.addText(api.url) 
    titleElement.textColor = Color.white() 
    titleElement.textOpacity = 0.7 
    titleElement.font = Font.mediumSystemFont(13) 
    widget.addSpacer(12) 
 
    let nameElement = widget.addText(api.name) 
    nameElement.textColor = Color.white() 
    nameElement.font = Font.boldSystemFont(18) 
    widget.addSpacer(2) 
    let descriptionElement = widget.addText(api.description) 
    descriptionElement.minimumScaleFactor = 0.5 
    descriptionElement.textColor = Color.white() 
    descriptionElement.font = Font.systemFont(18) 
 
    if (!config.runsWithSiri) { 
        widget.addSpacer(8) 
    } 
 
    return widget 
} 
async function randomAPI() { 
    let json = await getJson() 
    let jsonKey = Object.keys(json) 
 
    return { 
        name: json["query"], 
        description: json["country"], 
        url: json["org"] 
    } 
} 
 
async function getJson() { 
    let url = "http://ip-api.com/json" 
    let req = new Request(url) 
    return await req.loadJSON() 
} 
 
async function loadAppIcon() { 
    let url = "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/21/1e/13/211e13de-2e74-4221-f7db-d6d2c53b4323/AppIcon-1x_U007emarketing-0-7-0-85-220.png/540x540sr.jpg" 
    let req = new Request(url) 
    return req.loadImage() 
}