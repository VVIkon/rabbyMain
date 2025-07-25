import { Injectable } from '@nestjs/common';
import axios from "axios";
import { PersonDTO } from './DTO/person.dto';

@Injectable()
export class PersonService {

    async getPersons(cnt: number): Promise<PersonDTO[] | null>{
        const url = `https://api.randomdatatools.ru/?count=${cnt}`;
        const  { data, status }  = await axios(url);
        if (data && status === 200) {
            const raw = Array.isArray(data) ? data : [data];
            const person: PersonDTO[] = raw.map(el => {
                return {
                    lastName: el.LastName,
                    firstName: el.FirstName,
                    fatherName: el.FatherName,
                    dateOfBirth: el.DateOfBirth,
                    yearsOld: el.YearsOld,
                    phone: el.Phone,
                    login: el.Login,
                    password: el.Password,
                    email: el.Email,
                    gender: el.Gender,
                    genderCode: el.GenderCode,
                    pasportNum: el.PasportNum,
                    pasportSerial: el.PasportSerial,
                    pasportNumber: el.PasportNumber,
                    pasportCode: el.PasportCode,
                    pasportOtd: el.PasportOtd,
                    pasportDate: el.PasportDate,
                    inn_fiz: el.inn_fiz,
                    inn_ur: el.inn_ur,
                    snils: el.snils,
                    oms: el.oms,
                    ogrn: el.ogrn,
                    kpp: el.kpp,
                    address: el.Address,
                    addressReg: el.AddressReg,
                    country: el.Country,
                    region: el.Region,
                    city: el.City,
                    street: el.Street,
                    house: el.House,
                    apartment: el.Apartment,
                    bankBIK: el.bankBIK,
                    bankCorr: el.bankCorr,
                    bankINN: el.bankINN,
                    bankKPP: el.bankKPP,
                    bankNum: el.bankNum,
                    bankClient: el.bankClient,
                    bankCard: el.bankCard,
                    bankDate: el.bankDate,
                    bankCVC: el.bankCVC,
                    eduSpecialty: el.EduSpecialty,
                    eduProgram: el.EduProgram,
                    eduName: el.EduName,
                    eduDocNum: el.EduDocNum,
                    eduRegNumber: el.EduRegNumber,
                    eduYear: el.EduYear,
                    carBrand: el.CarBrand,
                    carModel: el.CarModel,
                    carYear: el.CarYear,
                    carColor: el.CarColor,
                    carNumber: el.CarNumber,
                    carVIN: el.CarVIN,
                    carSTS: el.CarSTS,
                    carSTSDate: el.CarSTSDate,
                    carPTS: el.CarPTS,
                    carPTSDate: el.CarPTSDate
                }
            })
            return person;
        }
        return null;
    }


}    