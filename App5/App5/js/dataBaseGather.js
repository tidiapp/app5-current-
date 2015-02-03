﻿//http://azure.microsoft.com/en-us/documentation/articles/mobile-services-html-how-to-use-client-library/
//http://azure.microsoft.com/en-us/documentation/articles/mobile-services-javascript-backend-windows-universal-javascript-get-started-data/

    (function () {
        "use strict";
        var appData = Windows.Storage.ApplicationData.current;
        var roamingSettings = appData.roamingSettings;

        WinJS.Namespace.define("server", {
            //home.html
            home: function (the_sel_age) {
                remove.pop_list(age_data.model.age);

                //milo: withFilter var Age = thinkitdrinkitDataClient.withFilter(noCachingFilter).getTable("Age"); suposed to not cache, great way to test for same name pictures being replaced never seems to refresh the new pic unless name is changed. 
                //milo: left all if (the_sel_age === "blahahahh") as names they are easy to change find all replace...
                var Age = thinkitdrinkitDataClient.getTable("Age");

                if (the_sel_age === "Protein") {
                    var query = Age.where({
                        AccessP: true
                    }).orderBy("Order").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Fitness & Exercise") {
                    var query = Age.where({
                        AccessR: true
                    }).orderBy("Order").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Nutrigenetic Test") {
                    var query = Age.where({
                        AccessNG: true
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.age.push({ age: results[i].Name, img: results[i].Image, info_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (the_sel_age === "Competitive Sports") {
                    var query = Age.where({
                        AccessS: true
                    }).orderBy("OrderS").read().done(function (results) {
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
                    age_data.model.info.push({ the_info: results[0].InfoLite, info_img: results[0].Image, info_name: results[0].Name, info_price: results[0].Price, id_sel: results[0].id })
                    //milo: this saves the url link from db so it can be called for the next page, the early save fixes a bug which the timing if you were to put this on the page you were actually loading it would not show up.
                    roamingSettings.values["db_url"] = results[0].Info;
                }, function (err) {
                    console.log(err);
                });
            },

            //func_home2 home2.html           
            func_home2: function () {
                remove.pop_list(age_data.model.func_home2);
                var Age = thinkitdrinkitDataClient.getTable("Func");

                var query = Age.where({
                    Home2: true
                }).orderBy("Name").read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.func_home2.push({ home2: results[i].Name, img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });                
            
            },
            func_sub_home2: function (name) {
                var Age = thinkitdrinkitDataClient.getTable("Func");
                remove.pop_list(age_data.model.info_page2_func_home2)

                var query = Age.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page2_func_home2.push({ the_info: results[0].InfoLite, info_img: results[0].Image, info_name: results[0].Name, id_sel: results[0].id })
                    roamingSettings.values["db_url"] = results[0].Info;
                }, function (err) {
                    console.log(err);
                });
            },

            //func.html func.html
            //milo id_sel is coming from home.html and server.home_sub() above
            func: function (id_sel, cat_selected) {
                remove.pop_list(age_data.model.func);
                var Func = thinkitdrinkitDataClient.getTable("Func");

                //milo: id_sel is the id that was picked by user from the db and it equals the actual id number to display the correct business logic 
                //milo: in the if statement == 'whatever number' is the actual id from the thinkitdrinkitDataClient.Age table in azure db
                var query = Func.where({
                    Age_id: id_sel
                }).orderBy("Order").read().done(function (results) {
                    for (var i = 0; i < results.length; i++) {
                        age_data.model.func.push({ func: results[i].Name, img: results[i].Image })
                    }
                }, function (err) {
                    console.log(err);
                });
            },

            func_sub: function (name) {
                var Func = thinkitdrinkitDataClient.getTable("Func");

                var query = Func.where({
                    Name: name
                }).read().done(function (results) {
                    age_data.model.info_page2_func.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image, b_vend: results[0].VendID, id_sel: results[0].id })
                    roamingSettings.values["db_url"] = results[0].Info;
                }, function (err) {
                    console.log(err);
                });
            },

            //base.html
            base: function (id_sel, cat_selected) {
                var Age = thinkitdrinkitDataClient.getTable("Base");
                //milo: id_sel == whatever #, the whatever # is the id from thinkitdrinkitDataClient.Func db in azure

                //think this 25 26 is from protein might have to be like: (the_sel_age === "Protein" && (id_sel == 25 || id_sel == 26))
                if (id_sel == 25 || id_sel == 26) {
                    var query = Age.where({
                        Age_id: id_sel
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (id_sel == 27 || id_sel == 28) {
                    var query = Age.where({
                        AgeDBhome_id: id_sel
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (cat_selected === "Energy") {
                    var query = Age.where({
                        Access: 1
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (cat_selected === "Weight Management") {
                    var query = Age.where({
                        Access: 2
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (cat_selected === "Lifestyle Diets") {
                    var query = Age.where({
                        Access: 3
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else if (cat_selected === "Wellness") {
                    var query = Age.where({
                        Access: 4
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    var query = Age.where({
                        FuncDBfunc_id: id_sel
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.base.push({ b_name: results[i].Name, b_pic: results[i].Image, base_price: results[i].Price })
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
                    age_data.model.info_page2.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_img: results[0].Label, base_price: results[0].Price, the_pic: results[0].Image, b_vend: results[0].VendID, b_vend_count: results[0].VendID_count, id_sel: results[0].id })
                    roamingSettings.values["db_url"] = results[0].Info;
                }, function (err) {
                    console.log(err);
                })

            },

            //flavor.html
            flav_sel: function () {
                var Age = thinkitdrinkitDataClient.getTable("Flavor");
                //milo.orderBy is taking the most text in the Name column also can do orderByDescending or both http://azure.microsoft.com/en-us/documentation/articles/mobile-services-html-how-to-use-client-library/

                var query = Age.where({
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
                    age_data.model.info_page4.push({ sel_name: results[0].Name, sel_info: results[0].InfoLite, sel_pic: results[0].Image, sel_label: results[0].Label, f_vend: results[0].VendID, f_vend_count: results[0].VendID_count })
                    roamingSettings.values["db_url"] = results[0].Info;
                }, function (err) {
                    console.log(err);
                })
            },

            //boost.html
            //milo: uses id from thinkitdrinkitData.Func table
            boost: function (cat_picked, id_func, id_sport, id_base) {
                var Age = thinkitdrinkitDataClient.getTable("Boost");

                if (id_func == 1) {//milo: bug fix helps show boosts when id_func == 1 (which is recover) is hit. it needs to be the first thing checked if its not then the boost will not show up since it ends up reading the next code down.   
                    var query = Age.where({
                        FuncDBfunc_id: id_func
                    }).orderBy("Name").read().done(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image, id_sel: results[i].id })
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    if (cat_picked === "Protein") {
                        var query = Age.where({
                            FuncDBfunc_id: id_func
                        }).orderBy("Name").read().done(function (results) {
                            for (var i = 0; i < results.length; i++) {
                                age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image, id_sel: results[i].id })
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    } else if (cat_picked === "Competitive Sports") {
                        var query = Age.where({
                            FuncDBsport_id: id_sport,
                            BaseDBbase_id: id_base
                        }).orderBy("Name").read().done(function (results) {
                            for (var i = 0; i < results.length; i++) {
                                age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image, id_sel: results[i].id })
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    } else if (cat_picked === "Energy" || cat_picked === "Fitness & Exercise" || cat_picked === "Weight Management" || cat_picked === "Lifestyle Diets" || cat_picked === "Wellness") {
                        var query = Age.where({
                            BaseDBbase_id: id_base
                        }).orderBy("Name").read().done(function (results) {
                            for (var i = 0; i < results.length; i++) {
                                age_data.model.boost.push({ boost_name: results[i].Name, boost_pic: results[i].Image, id_sel: results[i].id })
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            },
            boost_sub: function (id, name, cat_picked, id_func, id_sport, id_base) {
                var Age = thinkitdrinkitDataClient.getTable("Boost");

                //milo: this is for a bug in boost.html if clicking on image this fires if clicked on h1 else fires (the issue is coming from boost.html when div grabs event.srcElement.innerText there are two text areas h1 and span that couse issues) 
                if (id != isNaN && id != "") {
                    var query = Age.where({
                        id: id
                    }).read().done(function (results) {
                        age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID, id_sel: results[0].id })
                        roamingSettings.values["db_url"] = results[0].Info;
                    }, function (err) {
                        console.log(err);
                    })
                    //milo: bug continued, now if the h1 did get hit we have to compare the name in the db with the id
                } else {
                    if (id_func == 1){
                        var query = Age.where({
                            FuncDBfunc_id: id_func,
                            Name: name
                        }).read().done(function (results) {
                            age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID, id_sel: results[0].id })
                            roamingSettings.values["db_url"] = results[0].Info;
                        }, function (err) {
                            console.log(err);
                        })
                    
                    } else {
                        if (cat_picked === "Competitive Sports") {
                            var query = Age.where({
                                FuncDBsport_id: id_sport,
                                BaseDBbase_id: id_base,
                                Name: name
                            }).read().done(function (results) {
                                age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID, id_sel: results[0].id })
                                roamingSettings.values["db_url"] = results[0].Info;
                            }, function (err) {
                                console.log(err);
                            })
                        } else if (cat_picked === "Protein") {
                            var query = Age.where({
                                FuncDBfunc_id: id_func,
                                Name: name
                            }).read().done(function (results) {
                                age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID, id_sel: results[0].id })
                                roamingSettings.values["db_url"] = results[0].Info;
                            }, function (err) {
                                console.log(err);
                            })
                        } else if (cat_picked === "Energy" || cat_picked === "Fitness & Exercise" || cat_picked === "Weight Management" || cat_picked === "Lifestyle Diets" || cat_picked === "Wellness") {
                            var query = Age.where({
                                BaseDBbase_id: id_base,
                                Name: name
                            }).read().done(function (results) {
                                age_data.model.info_page5.push({ the_name: results[0].Name, the_info: results[0].InfoLite, the_pic: results[0].Image, the_label: results[0].Label, the_price: results[0].Price, bo_vend: results[0].VendID, id_sel: results[0].id })
                                roamingSettings.values["db_url"] = results[0].Info;
                            }, function (err) {
                                console.log(err);
                            })
                        }
                    }
                }
            },

            //login_sessions/info_home.js
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

            //supl_sport.js
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

//milo: more info working with webview
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
                       // console.log(results, "nope");
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
                    //roamingSettings.values["numberOfPurchases"] = results.length;
                    //if ((roamingSettings.values["numberOfPurchases"] / 10) % 1 === 0 && (roamingSettings.values["numberOfPurchases"] / 15) % 1 != 0 && (roamingSettings.values["numberOfPurchases"] / 25) % 1 != 0) {
                    //    server.tierSystem(document.getElementById("tier_one"));

                    //} else if ((roamingSettings.values["numberOfPurchases"] / 15) % 1 === 0) {
                    //    server.tierSystem(document.getElementById("tier_two"));

                    //} else if ((roamingSettings.values["numberOfPurchases"] / 25) % 1 === 0) {
                    //    server.tierSystem(document.getElementById("tier_three"));
                    //}
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
            },
            finalPageCall: function () {
                var finalCall = thinkitdrinkitDataClient.getTable("ShopCart");
                var roamingSettings = appData.roamingSettings;
                var query = finalCall.where({
                    CNum: 1
                }).read().done(function (results) {
                    //console.log("I made it here, Yay...");
                    roamingSettings.values["t"] = 0;
                    if (roamingSettings.values["totalOrderNumber1"] > 0) {
                        for (var i = 0; i < roamingSettings.values["totalOrderNumber1"]; i++) {
                            roamingSettings.values["t"] += (parseFloat(results[i].BasePrice) + parseFloat(results[i].BoostPrice) + parseFloat(results[i].Boost2Price) + parseFloat(results[i].Boost3Price) +  parseFloat(results[i].Boost4Price) +  parseFloat(results[i].Boost5Price) + parseFloat(results[i].Boost6Price) + parseFloat(results[i].Boost7Price) + parseFloat(results[i].Boost8Price) + parseFloat(results[i].TestPrice));
                        }
                    }
                  //  console.log("The is the number of total orders: " + roamingSettings.values["totalOrderNumber"] + ". This is the total current cost: " + roamingSettings.values["t"]);
                }, function (err) {
                    console.log("This is the error: " + err);
                });
            },
            VendPrep: function () {
                var finalCall = thinkitdrinkitDataClient.getTable("ShopCart");
                var roamingSettings = appData.roamingSettings;
                var Age = thinkitdrinkitDataClient.getTable("ShopCart");
                Age.insert({
                    CNum: roamingSettings.values["computerNumber"],
                    BaseName: roamingSettings.values["Base_name"],
                    BaseVend: roamingSettings.values["Base_vend"],
                    BaseImages: roamingSettings.values["Base_pic"],
                    BasePrice: parseFloat(roamingSettings.values["Base_price"]),
                    BoostName: roamingSettings.values["Boost1_name"],
                    BoostVend: roamingSettings.values["Boost1_Vend"],
                    BoostImages: roamingSettings.values["Boost1_pic"],
                    BoostPrice: parseFloat(roamingSettings.values["Boost1_price"]),
                    Boost2Name: roamingSettings.values["Boost2_name"],
                    Boost2Vend: roamingSettings.values["Boost2_vend"],
                    Boost2Images: roamingSettings.values["Boost2_pic"],
                    Boost2Price: parseFloat(roamingSettings.values["Boost2_price"]),
                    Boost3Name: roamingSettings.values["Boost3_name"],
                    Boost3Vend: roamingSettings.values["Boost3_vend"],
                    Boost3Images: roamingSettings.values["Boost3_pic"],
                    Boost3Price: parseFloat(roamingSettings.values["Boost3_price"]),
                    Boost4Name: roamingSettings.values["Boost3_name"],
                    Boost4Vend: roamingSettings.values["Boost4_vend"],
                    Boost4Images: roamingSettings.values["Boost4_pic"],
                    Boost4Price: parseFloat(roamingSettings.values["Boost4_price"]),
                    Boost5Name: roamingSettings.values["Boost5_name"],
                    Boost5Vend: roamingSettings.values["Boost5_vend"],
                    Boost5Images: roamingSettings.values["Boost5_pic"],
                    Boost5Price: parseFloat(roamingSettings.values["Boost5_price"]),
                    Boost6Name: roamingSettings.values["Boost6_name"],
                    Boost6Vend: roamingSettings.values["Boost6_vend"],
                    Boost6Images: roamingSettings.values["Boost6_pic"],
                    Boost6Price: parseFloat(roamingSettings.values["Boost6_price"]),
                    Boost7Name: roamingSettings.values["Boost7_name"],
                    Boost7Vend: roamingSettings.values["Boost7_vend"],
                    Boost7Images: roamingSettings.values["Boost7_pic"],
                    Boost7Price: parseFloat(roamingSettings.values["Boost7_price"]),
                    Boost8Name: roamingSettings.values["Boost8_name"],
                    Boost8Vend: roamingSettings.values["Boost8_vend"],
                    Boost8Images: roamingSettings.values["Boost8_pic"],
                    Boost8Price: parseFloat(roamingSettings.values["Boost8_price"]),
                    FlavName: roamingSettings.values["FlavSel_name"],
                    FlaveVend: roamingSettings.values["FlavSel_vend"],
                    FlavIamge: roamingSettings.values["FlavSel_pic"],
                    FlavPrice: parseFloat(roamingSettings.values["FlavSel_price"]),
                    TestName: roamingSettings.values["Nutrigenetics_name"],
                    TestVend: roamingSettings.values["Nutrigenetics_vend"],
                    TestImages: roamingSettings.values["Nutrigenetics_pic"],
                    TestPrice: parseFloat(roamingSettings.values["Nutrigenetics_price"]),
                }).done(function (results1) {
                    roamingSettings.values["totalOrderNumber"]++;
                    roamingSettings.values["computer" + roamingSettings.values["totalOrderNumber"] + "Number"] = results1.id;
                    var query = finalCall.where({
                        CNum: 1
                    }).read().done(function (results) {

                        for (var i = 0; i < results.length; i++) {
                            if (results[i].Boost2Price > 0 && results[i].Boost3Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price }
                                )
                            }
                            else if (results[i].Boost3Price > 0 && results[i].Boost4Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price }
                                   )
                            }
                            else if (results[i].Boost4Price > 0 && results[i].Boost5Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                                { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price }
                                   )
                            }
                            else if (results[i].Boost5Price > 0 && results[i].Boost6Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                                { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                                { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price }
                                   )
                            }
                            else if (results[i].Boost6Price > 0 && results[i].Boost7Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                                { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                                { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                                { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price }
                                   )
                            }
                            else if (results[i].Boost7Price > 0 && results[i].Boost8Price <= 0) {
                                age_data.model.order_final_call.push(
                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                                { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                                { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                                { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price },
                                { product_id: results[i].Boost7Vend, quantity: 1, price: results[i].Boost7Price }
                                    )
                            }
                            else if (results[i].Boost8Price > 0) {
                                age_data.model.order_final_call.push(

                                { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                                { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                                { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                                { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                                { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                                { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                                { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                                { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price },
                                { product_id: results[i].Boost7Vend, quantity: 1, price: results[i].Boost7Price },
                                { product_id: results[i].Boost8Vend, quantity: 1, price: results[i].Boost8Price }
                               )
                            }
                            else {
                                age_data.model.order_final_call.push(
                               { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                               { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                               { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice }
                               )
                            }
                        }
                        var array_t = Array();
                        var i = 0;
                        console.log(age_data.model.order_final_call.length)
                        console.log(age_data.model.order_final_call);
                        while (age_data.model.order_final_call.length > i) {
                            array_t.push({
                                product_id: age_data.model.order_final_call._keyMap[roamingSettings.values["i"]].data.product_id, quantity: 1, price: age_data.model.order_final_call._keyMap[roamingSettings.values["i"]].data.price
                            })
                            roamingSettings.values["i"] += 1;
                            i++
                            //console.log(i);
                        }
                        console.log("This one is not inside of a loop: ")
                        console.log(array_t);
                        WinJS.xhr({
                            type: "POST",
                            url: "https://thinkitdrinkit.vendhq.com/api/register_sales",
                            headers: { "Content-type": "application/json" },
                            user: "milo@thinkitdrinkit.com",
                            password: "agave2013",
                            data: JSON.stringify({
                                "register_id": "5ecccd41-3cbc-11e3-a29a-bc305bf5da20",
                                "user_name": "",
                                "customer_id": "",
                                "status": "SAVED",
                                "total_price": roamingSettings.values["the_complete_total"],
                                "note": document.getElementById('Cname').value,
                                "register_sale_products": array_t
                            }),
                        }).then(function sucess(res) {
                            roamingSettings.values["Invoice_number"] = JSON.parse(res.responseText).register_sale.invoice_number;
                            roamingSettings.values["I_ordered"] = "yes";
                            roamingSettings.values["not_cont"] = true;
                            roamingSettings.values["went_back"] = true;
                            roamingSettings.values["the_complete_total"] = 0;
                            remove.pop_list(age_data.model.order_final_call);
                           
                            roamingSettings.values["theComplete"] = document.getElementById("total").textContent;
                            var Agee = thinkitdrinkitDataClient.getTable("ShopCart");
                            var k = 1;
                            console.log("This is the lenght of what i'm looking for: " + roamingSettings.values["totalOrderNumber"]);
                            while (roamingSettings.values["totalOrderNumber"]+2 > k)
                            {
                                Agee.del({
                                    id: roamingSettings.values["computer" + k + "Number"]
                                }).done(function () {
                                    var l = 0;
                                    age_data.model.order_final_call.length = 0;
                                 
                                }, function (err) {
                                    console.log("Error: " + err);
                                });
                                roamingSettings.values.remove["computer" + k + "Number"]
                                k++
                            }
                            roamingSettings.values["totalOrderNumber"] = 0;
                            roamingSettings.values["totalOrderNumber1"] = 0;

                            remove.pop_list(age_data.model.order_final_read);

                            WinJS.Navigation.navigate('pages/thankyou/thankyou.html');

                        }, function error(err) {
                            console.log("fail", err.responseText)
                        });

                    })
                }, function (err) {
                    console.log(err);
                });
            },
            contSave: function () {
                var appData = Windows.Storage.ApplicationData.current;
                var roamingSettings = appData.roamingSettings;
                roamingSettings.values["computerNumber"] = 1;
                roamingSettings.values["totalOrderNumber"]++;
                roamingSettings.values["totalOrderNumber1"]++;
                var Age = thinkitdrinkitDataClient.getTable("ShopCart");
                //console.log("I'm here 1!")
                Age.insert({
                    CNum: roamingSettings.values["computerNumber"],
                    BaseName:roamingSettings.values["Base_name"],
                    BaseVend:roamingSettings.values["Base_vend"],
                    BaseImages:roamingSettings.values["Base_pic"],
                    BasePrice:parseFloat(roamingSettings.values["Base_price"]),
                    BoostName:roamingSettings.values["Boost1_name"],
                    BoostVend:roamingSettings.values["Boost1_Vend"],
                    BoostImages:roamingSettings.values["Boost1_pic"],
                    BoostPrice:parseFloat(roamingSettings.values["Boost1_price"]),
                    Boost2Name:roamingSettings.values["Boost2_name"],
                    Boost2Vend:roamingSettings.values["Boost2_vend"],
                    Boost2Images:roamingSettings.values["Boost2_pic"],
                    Boost2Price:parseFloat(roamingSettings.values["Boost2_price"]),
                    Boost3Name:roamingSettings.values["Boost3_name"],
                    Boost3Vend:roamingSettings.values["Boost3_vend"],
                    Boost3Images:roamingSettings.values["Boost3_pic"],
                    Boost3Price: parseFloat(roamingSettings.values["Boost3_price"]),
                    Boost4Name:roamingSettings.values["Boost3_name"],
                    Boost4Vend:roamingSettings.values["Boost4_vend"],
                    Boost4Images:roamingSettings.values["Boost4_pic"],
                    Boost4Price:parseFloat(roamingSettings.values["Boost4_price"]),
                    Boost5Name:roamingSettings.values["Boost5_name"],
                    Boost5Vend:roamingSettings.values["Boost5_vend"],
                    Boost5Images:roamingSettings.values["Boost5_pic"],
                    Boost5Price: parseFloat(roamingSettings.values["Boost5_price"]),
                    Boost6Name:roamingSettings.values["Boost6_name"],
                    Boost6Vend:roamingSettings.values["Boost6_vend"],
                    Boost6Images:roamingSettings.values["Boost6_pic"],
                    Boost6Price:parseFloat(roamingSettings.values["Boost6_price"]),
                    Boost7Name:roamingSettings.values["Boost7_name"],
                    Boost7Vend:roamingSettings.values["Boost7_vend"],
                    Boost7Images:roamingSettings.values["Boost7_pic"],
                    Boost7Price: parseFloat(roamingSettings.values["Boost7_price"]),
                    Boost8Name:roamingSettings.values["Boost8_name"],
                    Boost8Vend:roamingSettings.values["Boost8_vend"],
                    Boost8Images:roamingSettings.values["Boost8_pic"],
                    Boost8Price:parseFloat(roamingSettings.values["Boost8_price"]),
                    FlavName:roamingSettings.values["FlavSel_name"],
                    FlaveVend:roamingSettings.values["FlavSel_vend"],
                    FlavIamge:roamingSettings.values["FlavSel_pic"],
                    FlavPrice: parseFloat(roamingSettings.values["FlavSel_price"]),
                    TestName: roamingSettings.values["Nutrigenetics_name"],
                    TestVend: roamingSettings.values["Nutrigenetics_vend"],
                    TestImages: roamingSettings.values["Nutrigenetics_pic"],
                    TestPrice: parseFloat(roamingSettings.values["Nutrigenetics_price"]),
                }).done(function (results) {
                    console.log(results);
                    roamingSettings.values["computer" + roamingSettings.values["totalOrderNumber"] + "Number"] = results.id;

                   // console.log("This seems to  be working!! " + results.id);
                }, function (err) {
                    console.log(err);
                });
            },
            userOrderDone: function () {
               
            },

            userOrderFinalRead: function () {
                //milo: remove.pop_list(age_data.model.order_final_read); HAPPENS in final page when leaving.
                var Age = thinkitdrinkitDataClient.getTable("ShopCart");

               var query = Age.where({
               }).read().done(function (results) {

                   for (var i = 0; i < results.length; i++) {
                       if (results[i].Boost2Price > 0 && results[i].Boost3Price <= 0) {
                           age_data.model.order_final_read.push(
                           {
                            b_name: results[i].BaseName, b_img: results[i].BaseImages, b_price: "$" + results[i].BasePrice,
                            f_name: results[i].FlavName, f_price: results[i].FlavPrice,
                            bo_name: results[i].BoostName, bo_price: results[i].BoostPrice,
                            bo2_name: results[i].Boost2Name, bo2_price: results[i].Boost2Price
                           })
                       }
                       else if (results[i].Boost3Price > 0 && results[i].Boost4Price <= 0) {
                           age_data.model.order_final_read.push(
                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price }
                              )
                       }
                       else if (results[i].Boost4Price > 0 && results[i].Boost5Price <= 0) {
                           age_data.model.order_final_read.push(
                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                           { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price }
                              )
                       }
                       else if (results[i].Boost5Price > 0 && results[i].Boost6Price <= 0) {
                           age_data.model.order_final_read.push(
                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                           { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                           { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price }
                              )
                       }
                       else if (results[i].Boost6Price > 0 && results[i].Boost7Price <= 0) {
                           age_data.model.order_final_read.push(
                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                           { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                           { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                           { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price }
                              )
                       }
                       else if (results[i].Boost7Price > 0 && results[i].Boost8Price <= 0) {
                           age_data.model.order_final_read.push(
                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                           { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                           { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                           { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price },
                           { product_id: results[i].Boost7Vend, quantity: 1, price: results[i].Boost7Price }
                               )
                       }
                       else if (results[i].Boost8Price > 0) {
                           age_data.model.order_final_read.push(

                           { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                           { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                           { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice },
                           { product_id: results[i].Boost2Vend, quantity: 1, price: results[i].Boost2Price },
                           { product_id: results[i].Boost3Vend, quantity: 1, price: results[i].Boost3Price },
                           { product_id: results[i].Boost4Vend, quantity: 1, price: results[i].Boost4Price },
                           { product_id: results[i].Boost5Vend, quantity: 1, price: results[i].Boost5Price },
                           { product_id: results[i].Boost6Vend, quantity: 1, price: results[i].Boost6Price },
                           { product_id: results[i].Boost7Vend, quantity: 1, price: results[i].Boost7Price },
                           { product_id: results[i].Boost8Vend, quantity: 1, price: results[i].Boost8Price }
                          )
                       }
                       else {
                           age_data.model.order_final_read.push(
                          { product_id: results[i].BaseVend, quantity: 1, price: results[i].BasePrice },
                          { product_id: results[i].FlaveVend, quantity: 1, price: results[i].FlavPrice },
                          { product_id: results[i].BoostVend, quantity: 1, price: results[i].BoostPrice }
                          )
                       }
                   }
                   FinalClick.howManyBoosts();

                    //for (var i = 0; i < results.length; i++) {
                    //    age_data.model.order_final_read.push({ b_name: results[i].BaseName, b_img: results[i].BaseImages, b_price: results[i].BasePrice, f_name: results[i].FlavName, f_price: results[i].FlavPrice, bo_name: results[i].BoostName, bo_price: results[i].BoostPrice, bo2_name: results[i].Boost2Name, bo2_price: results[i].Boost2Price, bo3_name: results[i].Boost3Name, bo3_price: results[i].Boost3Price, bo4_name: results[i].Boost4Name, bo4_price: results[i].Boost4Price, bo5_name: results[i].Boost5Name, bo5_price: results[i].Boost5Price, bo6_name: results[i].Boost6Name, bo6_price: results[i].Boost6Price, bo7_name: results[i].Boost7Name, bo7_price: results[i].Boost7Price, bo8_name: results[i].Boost8Name, bo8_price: results[i].Boost8Price })
                    //}



                }, function (err) {
                    console.log(err);
                });
            }
        })
    })()