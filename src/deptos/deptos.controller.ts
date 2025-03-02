
// deptos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeptosService } from './deptos.service';
import { CreateDeptoDto } from './dto/create-depto.dto';
import { UpdateDeptoDto } from './dto/update-depto.dto';

@Controller('deptos')
export class DeptosController {
  constructor(private readonly deptosService: DeptosService) {}

  @Post()
  create(@Body() createDeptoDto: CreateDeptoDto) {
    return this.deptosService.create(createDeptoDto);
  }

  @Get()
  findAll() {
    return this.deptosService.findAll();
  }

  @Get('pay-days')
  getPayDays() {
    return this.deptosService.getPayDays();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptoDto: UpdateDeptoDto) {
    return this.deptosService.update(id, updateDeptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptosService.remove(id);
  }
}
