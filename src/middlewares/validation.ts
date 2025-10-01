import { Request, Response, NextFunction } from 'express';

export function validateBody(resource : "media" | "serie" | "user" | 'film' | 'episode' ) {

    //------------ FORMULES REGGEX ------------//
    const titleRegex = /^[A-Za-z0-9 ]+$/u;
    const durationRegex = /^[0-9]+$/;
    const statutRegex = /^(en_attente|en_cours|terminee)$/;


    //------------ GESTION DE RESPECT DE REGGEX ------------//
     return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body ?? {};
        const errors: string[] = [];
        const now = new Date();
        const currentYear = now.getFullYear();


        const push = (condition: boolean, message: string) => {
            if (!condition) {
                errors.push(message);
            }
        };
       
        //TITRE
        if("title" in body) {
            push(typeof body.title === "string" && titleRegex.test(body.title.trim()), "Le titre doit être une chaîne de caractères");
        }

        //DUREE
        if("duration" in body) {
            push(!durationRegex.test(String(body)), "La durée doit être un nombre entier");
        }

        //STATUT
        if("statut" in body) {
            push(typeof body.statut === "string" && statutRegex.test(body.statut.trim()), "Le statut doit être 'en_attente', 'en_cours' ou 'terminee'");
        }

        //YEAR
        if("year" in body) {
            push(typeof body.year === "number" && !Number.isInteger(body.year), "L'année doit être un nombre entier");
            push(typeof body.year === "number" && body.year > currentYear, `L'année doit être entre 1900 et ${currentYear}`);
        }

        //------------ VALIDATION ------------//
        if (resource === 'film'){
            push(!("title" in body), "Le champ 'title' est requis");
            push(!("duration" in body), "Le champ 'duration' est requis");
            push(!("year" in body), "Le champ 'year' est requis");
        }

        if (resource === 'episode'){
            push(!("title" in body), "Le champ 'title' est requis");
            push(!("episodeNumber" in body), "Le champ 'episodeNumber' est requis");
        }

        //------------ ERREUR 400 SI PROBLEME ------------//
        if(errors.length > 0) {
            return res.status(400).json({ errors });
        }

         next();

       
    }
}