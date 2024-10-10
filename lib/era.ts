export type Era = {
    name: string;
    start: Date;
    end?: Date;
};

const eras: Era[] = [
    { name: 'Before The Collage Dropout', start: new Date('06/08/1977'), end: new Date('08/18/2002') },
    { name: 'The College Dropout', start: new Date('08/18/2002'), end: new Date('02/10/2004') },
    { name: 'Late Registration', start: new Date('02/10/2004'), end: new Date('08/30/2005') },
    { name: 'Graduation', start: new Date('08/30/2005'), end: new Date('09/11/2007') },
    { name: '808s & Heartbreak', start: new Date('09/11/2007'), end: new Date('11/24/2008') },
    { name: 'Good Ass Job', start: new Date('11/24/2008'), end: new Date('05/01/2010') },
    { name: 'My Beautiful Dark Twisted Fantasy', start: new Date('05/01/2010'), end: new Date('11/22/2010') },
    { name: 'Watch The Throne', start: new Date('11/22/2010'), end: new Date('08/08/2011') },
    { name: 'Cruel Summer', start: new Date('08/08/2010'), end: new Date('09/14/2012') },
    { name: 'Thank God for the Drugs', start: new Date('09/14/2012'), end: new Date('05/16/2013') },
    { name: 'Yeezus', start: new Date('05/16/2013'), end: new Date('06/18/2013') },
    { name: 'Cruel Winter', start: new Date('09/14/2012'), end: new Date('01/10/2013') },
    { name: 'Yeezus 2', start: new Date('06/18/2013'), end: new Date('07/16/2014') },
    { name: 'So Help me God', start: new Date('07/16/2014'), end: new Date('06/28/2015') },
    { name: 'Swish', start: new Date('06/28/2015'), end: new Date('01/27/2016') },
    { name: 'The Life of Pablo', start: new Date('01/27/2016'), end: new Date('06/14/2016') },
    { name: 'Cruel Winter V2', start: new Date('10/01/2015'), end: new Date('11/20/2017') },
    { name: 'TurboGraFX16', start: new Date('02/16/2016'), end: new Date('11/22/2016') },
    { name: 'Daytona', start: new Date('12/18/2015'), end: new Date('05/25/2018') },
    { name: 'Hitler', start: new Date('11/30/2016'), end: new Date('05/21/2018') },
    { name: 'ye', start: new Date('05/21/2018'), end: new Date('06/07/2018') },
    { name: 'Kids See Ghosts', start: new Date('11/30/2016'), end: new Date('06/08/2018') },
    { name: 'Good Ass Job V2', start: new Date('06/27/2018'), end: new Date('2019') },
    { name: 'Yandhi V1', start: new Date('06/01/2018'), end: new Date('11/13/2018') },
    { name: 'Yandhi V2', start: new Date('11/13/2018'), end: new Date('04/21/2019') },
    { name: 'Jesus is King', start: new Date('04/21/2019'), end: new Date('10/31/2019') },
    { name: 'Jesus is Lord', start: new Date('10/25/2019'), end: new Date('07/18/2020') },
    { name: 'Jesus is King Dr. Dre Version', start: new Date('10/25/2019'), end: new Date('09/24/2020') },
    { name: 'Donda V1', start: new Date('07/18/2020'), end: new Date('03/07/2021') },
    { name: 'Donda V2', start: new Date('03/07/2021'), end: new Date('07/09/2021') },
    { name: 'Donda V3', start: new Date('07/09/2021'), end: new Date('11/15/2021') },
    { name: 'Donda 2', start: new Date('11/15/2021'), end: new Date('10/03/2022') },
    { name: 'WAR', start: new Date('04/01/2022'), end: undefined }, // ongoing
    { name: 'Y3', start: new Date('10/03/2022'), end: new Date('11/01/2023') },
    { name: 'Bad Bitch Play Book', start: new Date('early 2023'), end: new Date('10/28/2023') },
    { name: 'Vultures 1', start: new Date('10/28/2023'), end: new Date('02/10/2024') },
    { name: 'Vultures 2', start: new Date('02/10/2024'), end: new Date('08/16/2024') },
    { name: 'Bully', start: new Date('09/03/2024'), end: undefined } // ongoing
];

export default function findEra(date: Date): string[] {
    const activeEras = eras.filter(era => {
        return (!era.end || era.end >= date) && era.start <= date;
    });
    
    return activeEras.map(era => era.name);
}