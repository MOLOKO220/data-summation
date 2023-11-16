const object = {
    cz: {
        C: {
            2020: {
                '09': { value: 100, unit: 'MB', unitSystem: 1 },
                10: { value: 200, unit: 'MB', unitSystem: 1 },
            },
            2021: {
                '09': { value: 150, unit: 'MB', unitSystem: 1 },
                11: { value: 50, unit: 'MB', unitSystem: 1 },
            },
        },
    },
    lv: {
        C: {
            2020: {
                '09': { value: 10, unit: 'MB', unitSystem: 1 },
                10: { value: 20, unit: 'MB', unitSystem: 1 },
            },
            2021: {
                '09': { value: 15, unit: 'MB', unitSystem: 1 },
                12: { value: 5, unit: 'MB', unitSystem: 1 },
            },
        },
    },
    ee: {
        C: {
            2022: {
                '09': { value: 10, unit: 'MB', unitSystem: 1 },
                10: { value: 20, unit: 'MB', unitSystem: 1 },
            },
            2023: {
                '09': { value: 15, unit: 'MB', unitSystem: 1 },
                12: { value: 5, unit: 'MB', unitSystem: 1 },
            },
        },
    },
    pl: {
        C: {
            2021: {
                '09': { value: 10, unit: 'MB', unitSystem: 1 },
                10: { value: 20, unit: 'MB', unitSystem: 1 },
            },
            2023: {
                '09': { value: 15, unit: 'MB', unitSystem: 1 },
                12: { value: 5, unit: 'MB', unitSystem: 1 },
            },
        },
    },
    lt: {
        C: {
            2019: {
                '09': { value: 10, unit: 'MB', unitSystem: 1 },
                10: { value: 20, unit: 'MB', unitSystem: 1 },
            },
            2022: {
                '09': { value: 15, unit: 'MB', unitSystem: 1 },
                12: { value: 5, unit: 'MB', unitSystem: 1 },
            },
        },
    },
};

const arry = [
    {
        cz: {
            C: {
                2020: { '09': { value: 100 }, 10: { value: 200 } },

                2021: { '09': { value: 150 }, 11: { value: 50 } },
            },
        },
    },

    {
        lv: {
            C: {
                2020: { '09': { value: 10 }, 10: { value: 20 } },

                2021: { '09': { value: 15 }, 12: { value: 5 } },
            },
        },
    },

    {
        ee: {
            C: {
                2022: { '09': { value: 10 }, 10: { value: 20 } },

                2023: { '09': { value: 15 }, 12: { value: 5 } },
            },
        },
    },

    {
        pl: {
            C: {
                2021: { '09': { value: 10 }, 10: { value: 20 } },

                2023: { '09': { value: 15 }, 12: { value: 5 } },
            },
        },
    },

    {
        lt: {
            C: {
                2019: { '09': { value: 10 }, 10: { value: 20 } },

                2022: { '09': { value: 15 }, 12: { value: 5 } },
            },
        },
    },
];

function createGlobalList(incomingData) {
    // названия объекта, из списка стран
    let allCountryKay = '';
    let data; //принимает объект данных, если же входящие данные в виде массива преобразуем их в объект

    if (incomingData.length) {
        // если входные данные массив
        incomingData.forEach((el, index) => {
            if (index === 0) {
                allCountryKay += `${Object.keys(el)[0]}`;
            } else {
                allCountryKay += `+${Object.keys(el)[0]}`;
            }
            data = { ...data, ...el }; // перебрать массив и преобразовать его в один объект
        });
    } else {
        allCountryKay = Object.keys(incomingData).join('+');
        data = incomingData;
    }

    const newObject = {};
    newObject[allCountryKay] = { [Object.keys(Object.values(data)[0])]: {} }; // cz+lv+ee+pl+lt : C: {}

    Object.entries(data).forEach((el) => {
        Object.entries(Object.values(el[1])[0]).forEach((year) => {
            // year
            if (
                !newObject[allCountryKay][Object.keys(Object.values(data)[0])][
                    year[0]
                ]
            ) {
                // если такого года нету в новом объекте, создаём его и передаем в него данные
                newObject[allCountryKay][Object.keys(Object.values(data)[0])][
                    year[0]
                ] = year[1];

                // добовляем поле space = "cz+lv+ee+pl+lt"
                Object.values(
                    newObject[allCountryKay][
                        Object.keys(Object.values(data)[0])
                    ][year[0]]
                ).map((el) => (el.space = allCountryKay));
            } else {
                Object.entries(year[1]).forEach((month) => {
                    // month
                    if (
                        !newObject[allCountryKay][
                            Object.keys(Object.values(data)[0])
                        ][year[0]][month[0]]
                    ) {
                        // если такого месяца нет, добавляем
                        newObject[allCountryKay][
                            Object.keys(Object.values(data)[0])
                        ][year[0]][month[0]] = month[1];

                        // добовляем поле space в новый месяц
                        newObject[allCountryKay][
                            Object.keys(Object.values(data)[0])
                        ][year[0]][month[0]].space = allCountryKay;
                    } else {
                        // такой месяц уже есть, суммируем данные в нем
                        newObject[allCountryKay][
                            Object.keys(Object.values(data)[0])
                        ][year[0]][month[0]].value =
                            Number(
                                newObject[allCountryKay][
                                    Object.keys(Object.values(data)[0])
                                ][year[0]][month[0]].value
                            ) + Number(month[1].value);
                        // unitSystem, проверяем если в исходном объекте такое значение
                        if (
                            newObject[allCountryKay][
                                Object.keys(Object.values(data)[0])
                            ][year[0]][month[0]].unitSystem
                        ) {
                            //
                            newObject[allCountryKay][
                                Object.keys(Object.values(data)[0])
                            ][year[0]][month[0]].unitSystem =
                                Number(
                                    newObject[allCountryKay][
                                        Object.keys(Object.values(data)[0])
                                    ][year[0]][month[0]].unitSystem
                                ) + Number(month[1].unitSystem);
                        }
                    }
                });
            }
        });
    });

    return newObject;
}

console.log('arry');
console.log(createGlobalList(arry));
console.log('object');
console.log(createGlobalList(object));
