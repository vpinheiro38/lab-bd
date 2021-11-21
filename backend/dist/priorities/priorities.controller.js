"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrioritiesController = void 0;
const common_1 = require("@nestjs/common");
const priorities_service_1 = require("./priorities.service");
const create_priority_dto_1 = require("./dto/create-priority.dto");
const update_priority_dto_1 = require("./dto/update-priority.dto");
let PrioritiesController = class PrioritiesController {
    constructor(prioritiesService) {
        this.prioritiesService = prioritiesService;
    }
    create(createPriorityDto) {
        return this.prioritiesService.create(createPriorityDto);
    }
    findAll() {
        return this.prioritiesService.findAll();
    }
    findOne(id) {
        return this.prioritiesService.findOne(+id);
    }
    update(id, updatePriorityDto) {
        return this.prioritiesService.update(+id, updatePriorityDto);
    }
    remove(id) {
        return this.prioritiesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_priority_dto_1.CreatePriorityDto]),
    __metadata("design:returntype", void 0)
], PrioritiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrioritiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrioritiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_priority_dto_1.UpdatePriorityDto]),
    __metadata("design:returntype", void 0)
], PrioritiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrioritiesController.prototype, "remove", null);
PrioritiesController = __decorate([
    (0, common_1.Controller)('priorities'),
    __metadata("design:paramtypes", [priorities_service_1.PrioritiesService])
], PrioritiesController);
exports.PrioritiesController = PrioritiesController;
//# sourceMappingURL=priorities.controller.js.map