http://azure.microsoft.com/en-us/documentation/articles/mobile-services-html-how-to-use-client-library/
    (function () {
        "use strict";

        WinJS.Namespace.define("server", {
            //home.html
            home: function (the_sel_age) {
                remove.pop_list(age_data.model.age);
                var Age = thinkitdrinkitDataClient.getTable("Age");

                if (the_sel_age === "Nutritional") {
                    var query = Age.where({
                        AccessN: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Protein") {
                    var query = Age.where({
                        AccessP: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Nutrigenetics") {
                    var query = Age.where({
                        AccessNG: true
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }

            },
            home_sub: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Age");
                remove.pop_list(age_data.model.info)

                var query = Age.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info.push({ the_info: results[0].InfoLite, info_img: results[0].Image, info_name: results[0].Name, info_price: results[0].Price })
                }, function (err) {
                    console.log(err);
                });
            },
            //func.html
            func: function (the_sel_func) {
                remove.pop_list(age_data.model.func);
                var Func = thinkitdrinkitDataClient.getTable("Func");

                if (the_sel_func === "Sports Protein") {
                    var query = Func.where({
                        AccessSports: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Lifestyle Protein") {
                    var query = Func.where({
                        AccessLifestyle: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Diet Protein") {
                    var query = Func.where({
                        AccessDiet: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Functional Protein") {
                    var query = Func.where({
                        AccessFunctional: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Sports Nutrition" || the_sel_func === "F1") {
                    var query = Func.where({
                        AccessSportsNutrition: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Lifestyle Nutrition" || the_sel_func === "F2") {
                    var query = Func.where({
                        AccessLifestyleNutrition: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Diet Nutrition" || the_sel_func === "F3") {
                    var query = Func.where({
                        AccessDietNutrition: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_func === "Functional Nutrition" || the_sel_func === "F4") {
                    var query = Func.where({
                        AccessFunctionalNutrition: true
                    }).read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            },
            func_sub: function (name) {
                var Func = thinkitdrinkitDataClient.getTable("Func");

                var query = Func.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page2_func.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image, b_vend: results[0].VendID })
                }, function (err) {
                    console.log(err);
                });
            },
            //supl_sport.html
            sport: function () {
                remove.pop_list(age_data.model.sport);
                var Sport = thinkitdrinkitDataClient.getTable("Sport");
                var query = Sport.where({
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.sport.push({ sport: results[i].Name, img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            //Milo: Not being called or used
            //sport_sub: function (name) {
            //    var Sport = thinkitdrinkitDataClient.getTable("Sport");
            //    remove.pop_list(age_data.model.info_sport)

            //    var query = Sport.where({
            //        Name: name
            //    }).read().done(function (results) {
            //        age_data.model.info_sport.push({ the_info: results[0].InfoLite, info_img: results[0].Image, info_name: results[0].Name })
            //    }, function (err) {
            //        console.log(err);
            //    });
            //},

            //base.html
            base: function (the_sel_age) {
                var Age = thinkitdrinkitDataClient.getTable("Base");

                if (the_sel_age === "Nutritional") {
                    var query = Age.where({
                        Access: 1
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Protein") {
                    var query = Age.where({
                        Access: 3
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } 
            },
            base_sub: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Base");

                var query = Age.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page2.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image, b_vend: results[0].VendID })
                }, function (err) {
                    console.log(err);
                })

            },
            //protein.html
            protein: function () {
                var Age = thinkitdrinkitDataClient.getTable("Flavor");
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                var query = Age.where({
                    AccessProtein: true
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.the_protein.push({ b_name: results[i].Name, b_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            protein_sub: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Flavor");
                var query = Age.where({
                    Name: name,
                    AccessProtein: true
                }).read().done(function (results) {
                    age_data.model.protein_info.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image, p_vend: results[0].VendID })
                }, function (err) {
                    console.log(err);
                })
            },
            //flav: function (name) {
            //    var Age = thinkitdrinkitDataClient.getTable("FlavorBase");

            //        var query = Age.where({
            //        }).read().done(function (results) {
            //            for (var i = 0; i < results.length; i++) {
            //                age_data.model.flavor.push({ flavor_name: results[i].Name, flavor_pic: results[i].Image })
            //            }
            //        }, function (err) {
            //            console.log(err);
            //        });
            //},
            //flav_sub: function (name) {
            //    var Age = thinkitdrinkitDataClient.getTable("FlavorBase");
            //    var query = Age.where({
            //        Name: name
            //    }).read().done(function (results) {
            //        age_data.model.info_page3.push({ info_name_flav: results[0].Name, the_info_flav: results[0].Info, base_price: results[0].Price, info_img_flav: results[0].Image })
            //    }, function (err) {
            //        console.log(err);
            //    })
            //},

            //flavor.html
            flav_sel: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Flavor");
                //milo.orderBy is taking the most text in the Name column also can do orderByDescending or both http://azure.microsoft.com/en-us/documentation/articles/mobile-services-html-how-to-use-client-library/

                var query = Age.where({
                    AccessProtein: false
                }).orderBy("Name").read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.flavor1.push({ sel_flav_name: results[i].Name, sel_flav_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

            },
            flav_sel_sub: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Flavor");
                var query = Age.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page4.push({ sel_name: results[0].Name, sel_info: results[0].InfoLite, sel_pic: results[0].Image, sel_label: results[0].Label, f_vend: results[0].VendID })
                }, function (err) {
                    console.log(err);
                })
            },

            //boost.html
            boost: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Boost");
                var query = Age.orderBy("Name").read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        //Milo: boost_name etc are all id's in the html
                        age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            boost_sub: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Boost");
                var query = Age.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID })
                }, function (err) {
                    console.log(err);
                })
            },

            info_home_setup: function () {
                var Age = thinkitdrinkitDataClient.getTable("Base");
                var Age2 = thinkitdrinkitDataClient.getTable("Boost");
                var Age3 = thinkitdrinkitDataClient.getTable("Flavor");

                var query = Age.where({
                }).read().done(function (results) {
                    for (var i = 0; i < 4; i++) {
                        age_data.model.info_home_bases.push({ base_name: results[i].Name, base_img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

                var query = Age2.where({
                }).read().done(function (results) {
                    for (var i = 0; i < 4; i++) {
                        age_data.model.info_home_boost.push({ boost_name: results[i].Name, boost_img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });

                var query = Age3.where({
                }).read().done(function (results) {
                    for (var i = 0; i < 4; i++) {
                        age_data.model.info_home_flav.push({ flav_name: results[i].Name, flav_img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            sport_setup: function () {
                var Spo = thinkitdrinkitDataClient.getTable("Sport");

                var query = Spo.where({
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.info_home_sport.push({ sport_name: results[i].Name, sport_img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            more_info: function (clicked) {
                var Age = thinkitdrinkitDataClient.getTable(clicked);
                var query = Age.where({
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.whole_cat.push({ name: results[i].Name, img: results[i].Image });
                    }
                }, function (err) {
                    console.log(err);
                });
            },
            item_info: function (clicked, sel) {
                var Age = thinkitdrinkitDataClient.getTable(sel);
                var query = Age.where({
                    Name: clicked
                }).read().done(function (results) {
                    age_data.model.item_info.push({ name: results[0].Name, img: results[0].Image, info: results[0].Info, label: results[0].Label, info2: results[0].Info2, info3: results[0].Info3 });

                }, function (err) {
                    console.log(err);
                });
            },
            sport_info: function (clicked) {
                var Spo = thinkitdrinkitDataClient.getTable("Sport");
                var query = Spo.where({
                    Name: clicked
                }).read().done(function (results) {
                    age_data.model.item_info_sport.push({ name: results[0].Name, img: results[0].Image, info: results[0].Info, label: results[0].Label, info2: results[0].Info2, info3: results[0].Info3, infoH2: results[0].InfoH2, img2: results[0].Image2, info4: results[0].Info4, info5: results[0].Info5, info6: results[0].Info6, info7: results[0].Info7, info3H2: results[0].Info3H2, info5H2: results[0].Info5H2, infoLink: results[0].InfoLink, infoLink2: results[0].InfoLink2, infoLink3: results[0].InfoLink3 });

                }, function (err) {
                    console.log(err);
                });
            },
            login: function (pass, email) {
                var Age = thinkitdrinkitDataClient.getTable("Users");
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;

                var query = Age.where({
                    Email: email,
                    Password: pass
                }).read().done(function (results) {
                    if (results != "") {
                        console.log(results, "nope");
                        roamingSettings.values["login_lName"] = results[0].LastName;
                        roamingSettings.values["login_fName"] = results[0].FirstName;
                        roamingSettings.values["login_email"] = results[0].Email;
                        roamingSettings.values["login_vID"] = results[0].VendId;
                        roamingSettings.values["login_vcode"] = results[0].VendCode;
                        roamingSettings.values["login_phone"] = results[0].Phone;
                        roamingSettings.values["login_zip"] = results[0].Zip;
                        roamingSettings.values["login_id"] = results[0].id;

                        roamingSettings.values["true"] = true;
                        WinJS.Navigation.navigate('pages/login_sessions/profile/profile.html');
                    } else {
                        document.getElementById("fail").removeAttribute("hidden");
                    }

                }, function (err) {
                    console.log(err);
                    roamingSettings.values["true"] = false;
                });
            },
            login_user_past: function () {
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["numberOfPurchases"] === 44;
                var Age = thinkitdrinkitDataClient.getTable("UserOrders");
                var query = Age.where({
                    VendID: roamingSettings.values["login_vcode"]
                }).read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.login_user_past.push({
                            AgeName: results[i].Age, AgePic: results[i].AgeImage, BaseName: results[i].Base, BasePic: results[i].BaseImage, BaseID: results[i].BaseID, BasePrice: results[i].BasePrice, Boost1Name: results[i].Boost1, Boost1Pic: results[i].Boost1Image, Boost1ID: results[i].Boost1ID,
                            Boost1Price: results[i].Boost1Price, Boost2Name: results[i].Boost2, Boost2Pic: results[i].Boost2Image, Boost2ID: results[i].Boost2ID, Boost2Price: results[i].Boost2Price, Boost3Name: results[i].Boost3, Boost3Pic: results[i].Boost3Image, Boost3ID: results[i].Boost3ID, Boost3Price: results[i].Boost3Price,
                            FlavName: results[i].FlavName, FlavPic: results[i].FlavImage, FlavID: results[i].FlavID, Cal: results[i].Caloric, Date: results[i].PurchaseDate, Amount: results[i].TotalPrice, Order: results[i].OrderNumber
                        });
                    }
                    roamingSettings.values["numberOfPurchases"] = results.length;
                    if ((roamingSettings.values["numberOfPurchases"] / 10) % 1 === 0 && (roamingSettings.values["numberOfPurchases"] / 15) % 1 != 0 && (roamingSettings.values["numberOfPurchases"] / 25) % 1 != 0) {
                        server.tierSystem(document.getElementById("tier_one"));

                    } else if ((roamingSettings.values["numberOfPurchases"] / 15) % 1 === 0) {
                        server.tierSystem(document.getElementById("tier_two"));

                    } else if ((roamingSettings.values["numberOfPurchases"] / 25) % 1 === 0) {
                        server.tierSystem(document.getElementById("tier_three"));
                    }
                }, function (err) {
                    console.log(err);
                });
            },

            tierSystem: function (tier) {
                tier.style.borderColor = "blue";
                tier.style.borderWidth = "4px"

                tier.style.boxShadow = "3px 3px 10px 1px #d1cfcf";
                tier.style.cursor = "pointer";
                tier.onmousedown = function () {
                    tier.style.borderColor = "yellow";
                    tier.style.boxShadow = "none";
                };
                tier.onmouseup = function () {
                    tier.style.borderColor = "blue";
                    tier.style.boxShadow = "3px 3px 10px 1px #d1cfcf";
                }
            }

        })
    })()