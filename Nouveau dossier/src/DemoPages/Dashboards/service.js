
import axios from 'axios';
import configUrl from "./../../config.json"
import { type } from 'os';

const url = configUrl.endPoint;
console.log(url)

const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('TOKEN')}` }}



// Sportifs---------------------------------------------------------------------

export const getAllSportifs = async () => {

    return await axios.get(url + '/apis/Sportifs')
};

// ajout sportif
export const addSportif = async (sportif) => {
    console.log(url)
    const newSportif = await axios.post(url + '/api/auth/signupSportif', sportif, config)
    return newSportif;
};


//modifier sportif
export const editSportif = async (id, sportif) => {

    const editSportifs = await axios.put(url + `/apis/Sportif/${id}`, sportif,{headers: { "Content-Type": "application/json"}})
    return editSportifs;
};


// modifier photo de sportif
export const editPhotoSportif = async (id, sportif) => {

    const photosportif = await axios.put(url + `/apis/Updatephoto/${id}`, sportif,{headers: { "Content-Type": "application/json"}})
    return photosportif;
};

// get sportif by id
export const getSportifById = async (id) => {

    const sportif = await axios.get(url + `/apis/Sportifs/${id}`, config)
    return sportif;
};

//bloquer sportif
export const blockSportif = async (id) => {

    const blocksportif = await axios.put(url + `/apis/Block/${id}`, {headers: { "Content-Type": "application/json"}})
    return blocksportif;
};



//Coachs------------------------------------------------------------------------------
  //get coach
export const getAllCoachs = async () => {

    return await axios.get(url + '/apis/Coach')
};

  //add coach
export const addCoach = async (coach) => {
    console.log(url)
    const newCoach = await axios.post(url + '/api/auth/signup', coach, config)
    return newCoach;
};

// modifier coach
export const editCoach = async (id, coach) => {

    const coachedit = await axios.put(url + `/apis/Coach/${id}`, coach,{headers: { "Content-Type": "application/json"}})
    return  coachedit;
};

//get coach by id
export const getCoachfById = async (id) => {

    const coach = await axios.get(url + `/apis/Coach/${id}`, config)
    return coach;
};

// getservice bu id
export const getserviceById = async (id) => {

    const coachh = await axios.get(url + `/apis/Services/${id}`, config)
    return coachh;
};

// get disponiblité coach
export const getdispoCoach = async (id,month) => {
    const dispocoach = await axios.get(url + `/apis/GetDispobymonth/${id}/${month}`)
    return dispocoach;
};

// get hour coach
export const gethourCoach = async (id,day) => {
    const hourcoach = await axios.get(url + `/apis/GetDispo/${id}/${day}`)
    return hourcoach;
};


// edit photo coach
export const editPhotoCoach = async (id, coach) => {

    const photocoach = await axios.put(url + `/apis/Updatephotoco/${id}`, coach,{headers: { "Content-Type": "application/json"}})
    return photocoach;
};


//block coach
export const blockCoach = async (id) => {

    const blockcoach = await axios.put(url + `/apis/Blockcoach/${id}`, {headers: { "Content-Type": "application/json"}})
    return blockcoach;
};



// Categorie sport------------------------------------------------------------------

// get sport
export const getAllSports = async () => {

    return await axios.get(url + '/apis/CatSport')
};


// ajout sport
export const addSports = async (sport) => {
    console.log(url)
    const newSport = await axios.post(url + '/apis/CatSport', sport, {headers: { "Content-Type": "application/json"}})
    return newSport;
};