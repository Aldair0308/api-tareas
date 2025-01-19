import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pago } from './schemas/pago.schema';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagosService {
  constructor(@InjectModel('Pago') private readonly pagoModel: Model<Pago>) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const nuevoPago = new this.pagoModel(createPagoDto);
    return await nuevoPago.save();
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoModel.find().exec();
  }

  async findOne(id: string): Promise<Pago> {
    const pago = await this.pagoModel.findById(id).exec();
    if (!pago) {
      throw new NotFoundException(`Pago con el ID ${id} no encontrado`);
    }
    return pago;
  }

  async update(id: string, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pagoActualizado = await this.pagoModel.findByIdAndUpdate(
      id,
      updatePagoDto,
      { new: true },
    ).exec();
    if (!pagoActualizado) {
      throw new NotFoundException(`Pago con el ID ${id} no encontrado`);
    }
    return pagoActualizado;
  }

  async remove(id: string): Promise<{ message: string }> {
    const pagoEliminado = await this.pagoModel.findByIdAndDelete(id).exec();
    if (!pagoEliminado) {
      throw new NotFoundException(`Pago con el ID ${id} no encontrado`);
    }
    return { message: `Pago con el ID ${id} ha sido eliminado` };
  }
}
