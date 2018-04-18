var firebase = require('firebase');
var $ = require('./example_files/jquery-3.2.1.slim.min.js');

//Capacity Based
var config = {
    apiKey: "AIzaSyCz1QCypERKfLxB8yHvsr7A3VR2HrVWBWU",
    authDomain: "haven-hawaii.firebaseapp.com",
    databaseURL: "https://haven-hawaii.firebaseio.com",
    projectId: "haven-hawaii",
    storageBucket: "haven-hawaii.appspot.com",
    messagingSenderId: "138707248833"
  };
  firebase.initializeApp(config);

  typeColors = {
    'Fossil': '#D32F2F',
    'Biofuel': '#A04000',
    'Biomass': '#1E8449',
    'Solar': '#F5B041',
    'Wind': '#8E44AD',
    'Offshore Wind': '#2E86C1',
    'Hydro': '#48C9B0',
    'Demand': '#566573',
  };

  function Init(){
    this.stations = new Array();
    var i,j,k;
    firebase.database().ref().child(`/key/`).once('value').then((stations) => {
        stations.forEach(station => {
        this.stations.push({ type: station.val().type, id: station.key, resource: station.val().resource });
        });
    });

    return {
        e3:GardenizeCapacity('e3'), 
        genmod:GardenizeCapacity('e3genmod'), 
        postapril:GardenizeCapacity('postapril')
    };
  }

  function GardenizeSupply(year,month,day,sce){


    const dateQuery = `/${year}/${month}/${day}/`;
    const capacity = {};
    const demand = {};
    const profile = {};
    const data = {};

    firebase.database().ref().child(`/scenarios/`).child(`/${sce}/`).child('capacity').child(`/${year}/`).once('value').then((cap) => {
      cap.forEach(c => {
        if (!data['capacity']) { data['capacity'] = {}; }
        data['capacity'][c.key] = c.val();
      })
    }).then(() => {
      firebase.database().ref().child(`/scenarios/`).child(`/${sce}/`).child('demand').child(dateQuery).once('value').then((dem) => {
        dem.forEach(d => {
          if (!data['Demand']) { data['Demand'] = {}; }
          data['Demand'][d.key] = Number(d.val());
          if (!data['Fossil']) { data['Fossil'] = {}; }
          data['Fossil'][d.key] = Number(d.val());
        })
      }).then(() => {
        firebase.database().ref().child(`/profiles/`).child(dateQuery).once('value').then((prof) => {
        if(prof.val() === null){
             return;
        }
          profile[prof.key] = prof.val();
          //console.log(prof.val());
        }).then(() => {
            //console.log(profile);
          for (const key in profile) {
               //console.log(profile[key]);
               //console.log(profile[key].hasOwnProperty(key));
            /*if (profile[key].hasOwnProperty(key)) { 
                continue; }*/
                
            for (let i = 0; i < profile[key].length; i++) {

              const time = i;
              for (const id in data['capacity']) {
                  //console.log(data['capacity']);
                  //console.log(id);
                if (data['capacity'][id].hasOwnProperty(id)) { continue; }
                const resource = this.getStationResource(id);
        
                const type = this.getStationType(id);
                //console.log(type);
                if (resource === 'Fossil') { continue; }
                if (!data['capacity'][id]) { 
                    continue; }
                const percent = profile[key][time][resource];
                    //console.log('Key ' + key +' At Time ' + time + ' With Resource ' + resource + ' Of Type '+ type +  ' the Percent = ' + profile[key][time][resource]);
                const cap = data['capacity'][id];
                    //console.log('Capacity =' + data['capacity'][id]);
                let supply = percent * cap;
                if (Number.isNaN(supply)) { supply = 0; }
                if (!data[type]) { data[type] = {}; }
                if (!data[type][time]) { data[type][time] = 0; }
                data[type][time] += supply;
                data['Fossil'][time] -= supply;
                data['Fossil'][time] = Math.max(data['Fossil'][time], 0);
              }
            }
        }
          delete data['capacity'];
        }).then(() => {

            console.log(dateQuery);
            console.log(data);
            console.log(sce);
            console.log('Solar Day Sum = ' + DaySum(data,"Solar"));
            console.log('Wind Day Sum = ' + DaySum(data,"Wind"));
            console.log('Fossil Day Sum = ' + DaySum(data,"Fossil"));
            console.log('Demand Day Sum = ' + DaySum(data,"Demand"));
            console.log('OffShore Wind Sum = ' + DaySum(data, "Offshore Wind"));
            
        });
      })
    });
    return data;
  }

  function GardenizeCapacity(sce){
    const data = {};
    firebase.database().ref().child(`/scenarios/`).child(`/${sce}/`).child('capacity').once('value').then((years) => {
      years.forEach(year => {
        const yr = year.key;
        year.forEach(id => {
          const type = this.getStationType(id.key);
          if (!data[yr]) { data[yr] = {}; }
          if (!data[yr][type]) { data[yr][type] = 0; }
          data[yr][type] += parseFloat(id.val());
        });
      });
    }).then(()=>{
        gcCount++;
        if (gcCount === gcTotal) {
            gardenizer();
        }
    });

    return data;
  }



  function getStationType(id) {
    for (let i = 0; i < this.stations.length; i++) {
        //console.log('station: ' + id);
      if (this.stations[i].id === id) { 
          //console.log('station: ' + id);
          return this.stations[i].type; 
        }
    }
  }

  function getStationResource(id) {
    for (let i = 0; i < this.stations.length; i++) {
      if (this.stations[i].id === id) { return this.stations[i].resource; }
    }
  }

  function DaySum(data,type){
    var sum = 0;
    
    for(var i = 0; i < 24; i++){
        sum += data[type][i]; 
    }

    return sum;

  }

  function MonthSum(){
    var sum = 0;

    for(var i = 0; i < 24; i++){
        sum += DaySum(data); 
    }
        
  }

  