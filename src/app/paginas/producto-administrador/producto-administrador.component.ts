import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service'
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { Subscription, interval } from 'rxjs';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-producto-administrador',
  templateUrl: './producto-administrador.component.html',
  styleUrls: ['./producto-administrador.component.css'],
  imports: [CommonModule, CurrencyPipe, DatePipe]
})
export class ProductoAdministradorComponent implements OnInit, OnDestroy {

  producto: any = {
    id: 1,
    nombre: 'Silla Ejecutiva',
    codigo: 'SILL-001',
    precio: null,
    fechaUltimaModificacion: new Date(),
    stockDisponible: 10,
    categoria: 'Sillas',
    foto: 'https://via.placeholder.com/150'
  };

  precioNuevo: number | null = null;
  tiempoRestante: string = '';

  private temporizadorSub: Subscription | undefined;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {

    this.actualizarTemporizador();
    this.temporizadorSub = interval(1000).subscribe(() => this.actualizarTemporizador());

    this.crearGrafico();
  }

  ngOnDestroy(): void {
    if (this.temporizadorSub) {
      this.temporizadorSub.unsubscribe();
    }
  }

  private actualizarTemporizador() {
    const ahora = new Date();
    const diaActual = ahora.getDay(); 
    const proximoDomingo = new Date(ahora);

    const diasFaltantes = (7 - diaActual) % 7; 
    proximoDomingo.setDate(ahora.getDate() + diasFaltantes);
    proximoDomingo.setHours(20, 0, 0, 0); 

    const diff = proximoDomingo.getTime() - ahora.getTime();

    if (diff <= 0) {
      this.tiempoRestante = '0d 0h 0m 0s';
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    this.tiempoRestante = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  actualizarPrecio() {
    if (this.precioNuevo === null) return;

    // Actualizar localmente
    this.producto.precio = this.precioNuevo;
    this.producto.fechaUltimaModificacion = new Date();

    this.productoService.updateProducto(this.producto.id, this.producto).subscribe({
      next: (res) => console.log('Precio actualizado', res),
      error: (err) => console.error('Error al actualizar', err)
    });
  }

  private crearGrafico() {
    const ctx = (document.getElementById('graficoPrecio') as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Precio (Bs.)',
          data: [1000, 1100, 1050, this.producto.precio || 0],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    new Chart(ctx, config);
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (data) => this.producto = data,
      error: (err) => console.error('Error cargando producto', err)
    });
  }
}
