// deptos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Depto } from './schemas/depto.schema';
import { CreateDeptoDto } from './dto/create-depto.dto';
import { UpdateDeptoDto } from './dto/update-depto.dto';
import { PagosService } from '../pagos/pagos.service';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class DeptosService {
  constructor(
    @InjectModel('Depto') private readonly deptoModel: Model<Depto>,
    private readonly pagosService: PagosService,
    private readonly clientesService: ClientesService,
  ) {}

  async create(createDeptoDto: CreateDeptoDto): Promise<Depto> {
    const newDepto = new this.deptoModel(createDeptoDto);
    return await newDepto.save();
  }

  async findAll(): Promise<Depto[]> {
    return await this.deptoModel.find().exec();
  }

  async findOne(id: string): Promise<Depto> {
    const depto = await this.deptoModel.findById(id).exec();
    if (!depto) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return depto;
  }

  async update(id: string, updateDeptoDto: UpdateDeptoDto): Promise<Depto> {
    const updatedDepto = await this.deptoModel
      .findByIdAndUpdate(id, updateDeptoDto, { new: true })
      .exec();
    if (!updatedDepto) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return updatedDepto;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.deptoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`);
    }
    return { message: `Depto con el ID ${id} ha sido eliminado` };
  }

  async getPayDays(): Promise<
    { depto: number; vencimiento: string; monto: number }[]
  > {
    try {
      const deptos = await this.deptoModel.find({ activo: true }).exec();
      return deptos.map((depto) => ({
        depto: depto.numero,
        vencimiento: depto.vencimiento.toISOString(),
        monto: depto.precio,
      }));
    } catch (error) {
      console.error('Error al obtener los días de pago:', error);
      throw error;
    }
  }

  async checkAndCreatePayments(): Promise<void> {
    try {
      const payDays = await this.getPayDays();
      const today = new Date();

      for (const payDay of payDays) {
        const paymentDate = new Date(payDay.vencimiento);

        // Check if payment is due today
        if (
          paymentDate.getFullYear() === today.getFullYear() &&
          paymentDate.getMonth() === today.getMonth() &&
          paymentDate.getDate() === today.getDate()
        ) {
          // Fetch client information directly from the service
          const clientData = await this.clientesService.findByDepto(
            payDay.depto,
          );

          // Create payment
          await this.pagosService.create({
            monto: payDay.monto,
            tipo: 'mensualidad',
            depto: payDay.depto.toString(),
            cliente: clientData.nombre,
            telefono: clientData.telefono,
          });
        }
      }
    } catch (error) {
      console.error('Error checking and creating payments:', error);
      throw error;
    }
  }
}
