"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const priorities_module_1 = require("./priorities/priorities.module");
const tasks_module_1 = require("./tasks/tasks.module");
const categories_module_1 = require("./categories/categories.module");
const categories_tasks_module_1 = require("./categories-tasks/categories-tasks.module");
const routines_module_1 = require("./routines/routines.module");
const categories_routines_module_1 = require("./categories-routines/categories-routines.module");
const disponibilities_module_1 = require("./disponibilities/disponibilities.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, priorities_module_1.PrioritiesModule, tasks_module_1.TasksModule, categories_module_1.CategoriesModule, categories_tasks_module_1.CategoriesTasksModule, routines_module_1.RoutinesModule, categories_routines_module_1.CategoriesRoutinesModule, disponibilities_module_1.DisponibilitiesModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map