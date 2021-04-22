# Recipe Planet

I denne opgave skal du lave en applikation, som gør det muligt at søge i og læse forskellige opskrifter.

Opgaven er delt op i 2 afdelinger:

1. Et administrationspanel, hvor det er muligt at tilføje, slette og rette opskrifter.
2. Selve applikationen, hvor det er muligt at søge og læse opskrifter.

Begge dele af opgaven gør brug af et API, som du her får udleveret.

For at bruge dette API, skal du installere det på din computer og køre det. Følg disse trin:

Første gang
```
$ npm install
$ npm run build
```

Herefter, skal du køre
```
$ npm run develop
```

Der er 2 brugere tilknyttet APIet:

Navn: Admin Adminsen  
Email: admin@recipe-api.com  
Adgangskode: Hul3p1ndsv1n

Navn: Albert Jensen  
Email: albert@recipe-api.com  
Adgangskode: 123Albert123

Du skal hovedsageligt kun bruge Albert.

## Opgavens 1. del

I denne første del af opgaven skal du lave et administrationspanel, hvor brugere (Albert) kan logge ind og oprette, redigere og slette opskrifter.

Administrationspanelets design skal ligne dette: https://rts-cmk.github.io/admin-panel/  
(der må gerne være små afvigelser eller forbedringer, men overordnet set skal produktet matche designet)

### Views

* Log ind
* Oversigt over brugerens opskrifter (med knapper til at slette og redigere, samt knap til at oprette ny opskrift)
* Formular til oprettelse af ny opskrift
* Formular til redigering af eksisterende opskrift

### Krav

* Alle formulares skal valideres med `useForm`
* Alle destruktive handlinger skal bekræftes (fx slet en opskrift)
* Credentials (token) skal gemmes enten i Context eller som en cookie, afhængig af hvad brugeren vælger når de logger ind.

#### Felter i en opskrift
* Navn på opskrift (`title`)
* Beskrivelse (`description`)
* Fremgangsmåde (`procedure`)
* Billeder (`images`, liste/array)
* Ingredienser (`ingredients`, liste/array)
* Kalorier (`kcal`)
* Protein (gram) (`protein`)
* Kulhydrater (gram) (`carbs`)
* Fedt (gram) (`fat`)
* Kategori (`category`)
* Type (`type`)
* Forberedelsestid (minutter) (`cook_time`)
* (Usynligt felt) Ophavsmand (hvilken bruger har forfattet denne opskrift) (`author`)

### Stack
* React
* Sass
* Bootstrap (valgfri)
* react-hook-form (https://react-hook-form.com/get-started)
* Axios (https://www.npmjs.com/package/axios)

## APIet
Du kan downloade APIet her: https://github.com/rts-cmk/recipe-api

Efter du har downloadet APIet skal du installere det:
```
$ npm install
$ npm run build
```

Når du kører APIet med `npm run develop`, er det tilgængeligt på http://localhost:1337.

En anonym bruger kan se opskrifter (READ/GET) (alle og enkeltvis) på http://localhost:1337/recipes/[1,2,3,...]

En autoriseret bruger kan oprette opskrifter (CREATE/POST), se opskrifter (READ/GET), redigere opskrifter (UPDATE/PATCH/PUT) og slette opskrifter (DELETE) på samme adresse som ovenfor.

En bruger kan autoriseres på (POST) http://localhost:1337/auth/local.

Eksempel på en autorisations-request (med axios):
```javascript
import axios from "axios";

var { data } = await axios.post("http://localhost:1337/auth/local", {
	identifier: "albert@recipe-api.com",
	password: "123Albert123"
});

console.log(data);
```

Eksempel på et kald til en resurse på APIet, som kræver token:
```javascript
import axios from "axios";

var response = await axios.delete("http://localhost:1337/recipes/42", {
	headers: {
		Authorization: "Bearer <insert token here>"
	}
});

console.log(response);
```

## Forslag til arbejdsgang
1. Lav komponenter til alle designelementerne, altså ikke noget funktionalitet endnu, kun JSX og Sass
2. Få login processen på plads, så Albert kan logge ind og får et token, enten som cookie eller gemt i contexten
3. Få vist en liste over alle Alberts opskrifter
4. Opret en ny opskrift
5. Slet en opskrift
6. Rediger en opskrift