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

function createGlobalList(obj, arry) {
    // названия объекта генерируется от переменной "obj", если же страны в object и arry не будут совпадать, название будет некорректным
    const allCountryKay = Object.keys(obj).join('+'); // cz+lv+ee+pl+lt

    const newObject = {};
    newObject[allCountryKay] = { C: {} };

    // перебираем объекты, суммируем данные
    function dataSummationCycle(resultObject, donorObject) {
        for (let key in donorObject) {
            Object.keys(donorObject[key].C).forEach((year) => {
                if (resultObject[allCountryKay].C[year] === undefined) {
                    // если такого года нету в новом объекте, создаём его и передаем в него данные
                    resultObject[allCountryKay].C[year] =
                        donorObject[key].C[year];
                } else {
                    // такой год есть! перебираем месяцы в году и сумируем value\unitSystem
                    Object.keys(donorObject[key].C[year]).forEach((month) => {
                        if (
                            resultObject[allCountryKay].C[year][month] ===
                            undefined
                        ) {
                            // если в этом объекте(году) нету данных про этот месяц, то добовляем месяц
                            resultObject[allCountryKay].C[year][month] =
                                donorObject[key].C[year][month];
                        } else {
                            // если данные за этот месяц есть в этом году, то сумируем value, и unitSystem
                            // value
                            resultObject[allCountryKay].C[year][month].value =
                                Number(
                                    resultObject[allCountryKay].C[year][month]
                                        .value
                                ) +
                                Number(donorObject[key].C[year][month].value);
                            // unitSystem, проверяем если в исходном объекте такое значение
                            if (
                                donorObject[key].C[year][month].unitSystem !==
                                undefined
                            ) {
                                resultObject[allCountryKay].C[year][
                                    month
                                ].unitSystem =
                                    Number(
                                        resultObject[allCountryKay].C[year][
                                            month
                                        ].unitSystem
                                    ) +
                                    Number(
                                        donorObject[key].C[year][month]
                                            .unitSystem
                                    );
                            }
                        }
                    });
                }
            });
        }
    }

    dataSummationCycle(newObject, obj);

    arry.forEach((donorOb) => {
        // перебераем массив с обектами
        dataSummationCycle(newObject, donorOb);
    });

    return newObject;
}
console.log(createGlobalList(object, arry));
