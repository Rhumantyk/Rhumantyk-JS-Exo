// Variables globales
let Vehicles = [];
let RaceLength = 0;
let PixelByKm = 0;
const TrackDelta = 93; // Espace par rapport au width.

// classe
class Vehicle
{
    constructor(P_Color, P_Speed, P_Type = "Voiture") // Méthode + (paramètre/valeur, paramètre/valeur, ...)
    {
        this.Id = Vehicles.length + 1; // Création d'Id pour les véhicules. length étant égal à 0 à l'origine.
        this.Type = P_Type; // .Type étant la propriété, P_Type étant sa valeur attribué
        this.Color = P_Color;
        this.Speed = P_Speed;
        this.TraveledDistance = 0;
        this.isEngineOn = false; // "is"(...) utilisé pour booléans
        this.TotalTime = 0; // Temps total pour la course effectuée.
        this.CSSClass = "VehicleType";

        if (this.Type == "Avion") // Variation du style CSS de chaque véhicule
        {
            this.CSSClass = "VehicleTypePlane";
            this.Symbol = "plane";
        }
        else if (this.Type == "Moto")
        {
            this.CSSClass = "VehicleTypeBike";
            this.Symbol = "motorcycle";
        }
        else if (this.Type == "Voiture")
        {
            this.CSSClass = "VehicleTypeCar";
            this.Symbol = "car-side";
        }

        Vehicles.push(this); // Objet que l'on crée (avec ses propriétés). En lien avec la function Start.
    }

    GetStatus()
    {
        let OnOff = null; // Variable qui n'a pas encore de valeur (vide).
        let JumpLine = "";
        if (this.isEngineOn)// en l'occurence = true --> cf. Start.
        {
            OnOff = "en route"; // Lorsque true
            JumpLine = "</br>";
        }
        else
        {
            OnOff = "à l'arrêt"; // Lorsque false
        }
        
        return this.Display() + ", le véhicule est " + OnOff + JumpLine;
    }

    Display(isInRace = null) // Affiche la description d'un véhicule via strings
    {
        let JumpLineBis = "</br>";
        let Description = this.Id + ") <span class='" + this.CSSClass + "'>" + this.Type + "</span> " + this.Color; // Le fait qu'il y ait "null", la variable Desciption sera la seule utilisée de toute la fonction

        if (isInRace != null && !isInRace)// ! = Not  [Tout comme : && (and), || (or) --> Opérateurs logiques]
        {
            Description += " va à " + this.Speed + "km/h"; // Affichage
        }

        else if (isInRace != null)
        {
            Description += " a parcouru " + this.TraveledDistance + "km"; // En course
        }
        
        return JumpLineBis += Description; // Return uniquement pour retourner un résultat quand méthode utilisée. Return stoppe le code anyway, s'effectue 1 fois.
    }


    Start() // Méthode (action donc) appliquée à un objet véhicule
    {
        this.isEngineOn = true;
    }

    Move()
    {
        this.TotalTime = this.TotalTime + 1;
        this.TraveledDistance = this.TotalTime * this.Speed;
    }

    Stop()
    {
        this.isEngineOn = false;
        return this.GetStatus() + ", et a parcouru : " + this.TraveledDistance + "km en " + this.TotalTime + " heure(s) " + "</br>";
    }
}


function Start() // Cf. let vehicles
{
    ChangeButtonAccessibility("Race", "Off");

    // let V1 = new Vehicle("blanc", 500, "Avion");
    // Vehicles.push(new Vehicle("vert", 130));

    new Vehicle("blanc", 500, "Avion");
    new Vehicle("rouge", 150);
    new Vehicle("vert", 130);
    new Vehicle("rouge", 600, "Avion");
    new Vehicle("jaune", 200, "Moto");
}

function ShowVehicles()
{
    // alert("Début de la fonction d'affichage des " + Vehicles.length + " véhicules."); // Méthode de l'objet .window (raccourci)
    let MyList = document.getElementById("VehicleList"); // MyList est une variable contenant la page html. document = objet avec propriétés
    let MyTrack = document.getElementById("Track");
    MyTrack.innerHTML = "";
    MyList.innerHTML = ""; // MyList = C'est l'objet div. InnerHTML = Propriété représentant le contenu de l'objet div. Le "" supprime le texte dans l'HTML.
    for(let MyVehicle of Vehicles) // Pour chaque véhicule (un élément de la class Vehicle) que j'appelle MyVehicle faisant partie de ma liste tableau de Vehicules.
    {
        MyList.innerHTML += MyVehicle.Display(false) + MyVehicle.GetStatus(); // Dans l'id HTML VehicleList, s'ajoutera (+=) les éléments suivants ...
        MyTrack.innerHTML += "<i id='Icon" + MyVehicle.Id + "' style='left: 0px;' class='fas fa-" + MyVehicle.Symbol + "'></i></br>"; // Ajoute dynamiquement les véhicules.
    }
}

function TraveledKm()
{
    MyList = document.getElementById("VehicleList");
    MyList.innerHTML = "";
    for(MyVehicle of Vehicles)
    {
        MyList.innerHTML += MyVehicle.Display(true);
    }
}

function StartVehicles()
{
    ChangeButtonAccessibility("Race", "On"); // Btn disable ou non
    ChangeButtonAccessibility("Start", "Off"); // L'ordre (sauf entre ()) importe peu

    MyList = document.getElementById("VehicleList");
    MyList.innerHTML = "";
    for (MyVehicle of Vehicles)
    {
        if (MyVehicle.Type == "Avion", "Voiture", "Moto")
        {
            MyVehicle.Start();
            MyList.innerHTML += MyVehicle.GetStatus();
        }
    }
}

function Race()
{
    MyList = document.getElementById("VehicleList");
    MyList.innerHTML = "";
    
    MyDistance = document.getElementById("Distance");
    RaceLength = MyDistance.value;
    PixelByKm = (document.getElementById("Track").width - TrackDelta) / RaceLength;

    ChangeFormAccessibility("Distance", MyVehicle.TraveledDistance >= 1); // Form disable ou non

    for(MyVehicle of Vehicles)
    {
        if (MyVehicle.isEngineOn) // Ici True, puisque moteur on grâce à StartVehicles() 
        {
            MyVehicle.Move();
        }

        MyList.innerHTML += MyVehicle.Display(true);

        if (MyVehicle.TraveledDistance >= RaceLength)
        {
            MyList.innerHTML += MyVehicle.Stop();
        }
    }
}


// Changement de classe CSS btn (function StartVehicles)
function ChangeButtonAccessibility(Id, Status)
{
    MyButton = document.getElementById(Id);
    if (Status == "On")
    {
        MyButton.classList.remove("ButtonOff");
        MyButton.disabled = false;
    }
    else if (Status == "Off")
    {
        MyButton.classList.add("ButtonOff");
        MyButton.disabled = true;
    }
}

// Changement de classe CSS Form (function StartVehicles)
function ChangeFormAccessibility(Id, _Status)
{
    MyButton = document.getElementById(Id);
    if (_Status == MyVehicle.TraveledDistance >= 1)
    {
        MyButton.classList.add("ButtonOff");
        MyButton.disabled = true;
    }
}


// Tentative création de piste

// let VehiclePosition = 0;
// function Track()
// {
//     // Mylist = document.getElementById("Track").style.position = 'relative';

//     // Pour bouger véhicules. En lien direct avec la class Relative.
//     let Element = document.getElementById("Track");
//     let MyFas = document.getElementsByClassName("fas");
    

//         for (MyFas of Vehicles)
//         {
//             // MyFas = document.getElementsByClassName("fas");
//             // MyFas.classList.add("Relative");
//             // if (MyVehicle.Symbol === "plane") // & MyVehicle.Speed == 600
//             // {
//                 VehiclePosition += 60;
//                 Element.style.left = VehiclePosition + "px";
//             // }
//         }
// }

// let VehiclePosition = 0; // Cette fonction fait bouger la div "Track" sans faire disparaître les Symbols.
// function Track()
// {
//     let Element = document.getElementById("Track");
//     let MyFas = document.getElementsByClassName("fas");

//     for (MyFas of Vehicles)
//     {
//         VehiclePosition += 60;
//         Element.style.left = VehiclePosition + "px";
//     }
// }






// let VehiclePosition = 0; // Cette fonction ne fait rien.
function Track()
{
    MyDistance = document.getElementById("Distance");
    RaceLength = MyDistance.value;
    MyTrack = document.getElementById("Track");
    MyTrackWidth = getComputedStyle(MyTrack).width.replace("px", ""); // getcomputedstyle récupère tous les styleCSS non en dur(cf dynamique) avec le . style qu'on veut récupérer
    PixelByKm = (MyTrackWidth - TrackDelta) / RaceLength;
    // console.log
    // (
    //     "document.getElementById('Track').id : " + document.getElementById("Track").id + "\n" +
    //     "getComputedStyle('MyTrack').width : " + getComputedStyle(MyTrack).width + "\n" + 
    //     "TrackDelta : " + TrackDelta + "\n" +
    //     "RaceLength : " + RaceLength + "\n"
    // );

    for (MyVehicle of Vehicles)
    {
        VehicleIcon = document.getElementById("Icon" + MyVehicle.Id);
        VehicleIcon.style.left = (MyVehicle.TraveledDistance * PixelByKm) + "px";
        // console.log(
        //     "MyVehicle.TraveledDistance : " + MyVehicle.TraveledDistance + "\n" +
        //     "PixelByKm : " + PixelByKm + "\n" +
        //     "VehicleIcon.id : " + VehicleIcon.id + "\n" + // \n = espace
        //     "VehicleIcon.style.left : " + VehicleIcon.style.left
        //     );

        if (VehicleIcon.style.left >= RaceLength)
        {
            VehicleIcon.style.left = RaceLength + "px" - RaceLength;
        }
    }

    // for(MyVehicle of Vehicles)
    // {
    //     if (VehicleIcon.style.left > RaceLength)
    //     {
    //         VehicleIcon.style.left = RaceLength;
    //     }
    // }

}

// function LimitTrack()
// {
//     MyDistance = document.getElementById("Distance");
//     RaceLength = MyDistance.value;
//     for (MyVehicle of Vehicles)
//     {
//         if(MyVehicle.TraveledDistance > RaceLength)
//         {
//             MyVehicle.TraveledDistance = RaceLength;
//         }
//     }
// }