
// clientes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from './schemas/cliente.schema';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel('Cliente') private readonly clienteModel: Model<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const now = new Date();
    const offset = -6 * 60; // UTC-6 minutos (CDMX)
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
    createClienteDto.fecha = localDate.toISOString();
    const newCliente = new this.clienteModel(createClienteDto);
    return await newCliente.save();
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteModel.find().exec();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con el ID ${id} no encontrado`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const updatedCliente = await this.clienteModel.findByIdAndUpdate(id, updateClienteDto, { new: true }).exec();
    if (!updatedCliente) {
      throw new NotFoundException(`Cliente con el ID ${id} no encontrado`);
    }
    return updatedCliente;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.clienteModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cliente con el ID ${id} no encontrado`);
    }
    return { message: `Cliente con el ID ${id} ha sido eliminado` };
  }

  async getClientesInfo(): Promise<any[]> {
    const clientes = await this.clienteModel.find({}, 'depto nombre telefono').exec();
    return clientes.filter(cliente => cliente.depto !== null && !isNaN(cliente.depto));
  }

  async findByDepto(depto: number): Promise<Cliente | null> {
    const cliente = await this.clienteModel.findOne({ depto }).exec();
    if (!cliente) {
      throw new NotFoundException(`No se encontró cliente para el departamento ${depto}`);
    }
    return cliente;
  }
}
