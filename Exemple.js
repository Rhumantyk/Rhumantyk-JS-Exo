// classe
class Vehicle
{
    constructor(P_Color, P_Speed, P_Type = "Voiture") // Méthode + (paramètre/valeur, paramètre/valeur, ...)
    {
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
        }
        else if (this.Type == "Moto")
        {
            this.CSSClass = "VehicleTypeBike";
        }
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

    Display(isInRace = null) // Affiche la description d'un véhicule via strings
    {
        let JumpLineBis = "</br>";
        let Description = "<span class='" + this.CSSClass + "'>" + this.Type + "</span> " + this.Color; // Le fait qu'il y ait "null", la variable Desciption sera la seule utilisée de toute la fonction

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
}

let Vehicles = [];

function StartList()
{
    let V1 = new Vehicle("blanc", 500, "Avion");
    let V2 = new Vehicle("rouge", 150);
    Vehicles.push(V1);
    Vehicles.push(V2);
    Vehicles.push(new Vehicle("vert", 130));
    Vehicles.push(new Vehicle("rouge", 600, "Avion"));
    Vehicles.push(new Vehicle("jaune", 200, "Moto"));
}

function ShowVehicles()
{
    alert("Début de la fonction d'affichage des " + Vehicles.length + " véhicules."); // Méthode de l'objet .window (raccourci)
    let MyList = document.getElementById("VehicleList"); // MyList est une variable contenant la page html. document = objet avec propriétés
    MyList.innerHTML = ""; // MyList = C'est l'objet div. InnerHTML = Propriété représentant le contenu de l'objet div. Le "" supprime le texte dans l'HTML.
    for(let MyVehicle of Vehicles) // Pour chaque véhicule (un élément de la class Vehicle) que j'appelle MyVehicle faisant partie de ma liste tableau de Vehicules.
    {
        MyList.innerHTML += MyVehicle.Display(false) + MyVehicle.GetStatus(); // Dans l'id HTML VehicleList, s'ajoutera (+=) les éléments suivants ...
    }
}

function TraveledKM()
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

    for(MyVehicle of Vehicles)
    {
        if (MyVehicle.isEngineOn) // Ici True, puisque moteur on grâce à StartVehicles() 
        {
            MyVehicle.Move();
        }

        MyList.innerHTML += MyVehicle.Display(true);

        if (MyVehicle.TraveledDistance >= MyDistance.value)
        {
            MyList.innerHTML += MyVehicle.Stop();
        }
    }
}

function ButtonClass() // Pourquoi ça ne fonctionne pas ?
{
    MyList = document.getElementById("ButtonRace");
    for(MyVehicle of Vehicles)
    {
        if (MyVehicle.isEngineOn = true)
        {
            document.getElementById("ButtonRace").className = "Button";
        }
        else (MyVehicle.isEngineOn = false)
        {
            document.getElementById("ButtonRace").className = "ButtonOff";
        }
    }
}