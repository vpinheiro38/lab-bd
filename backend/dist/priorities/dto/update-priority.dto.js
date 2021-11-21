"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePriorityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_priority_dto_1 = require("./create-priority.dto");
class UpdatePriorityDto extends (0, mapped_types_1.PartialType)(create_priority_dto_1.CreatePriorityDto) {
}
exports.UpdatePriorityDto = UpdatePriorityDto;
//# sourceMappingURL=update-priority.dto.js.map