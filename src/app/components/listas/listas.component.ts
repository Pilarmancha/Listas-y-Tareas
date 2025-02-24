import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController ) { }

  ngOnInit() {}



  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  async borrarLista(lista: Lista) {

    const alert = await this.alertController.create({
      cssClass: 'colorBoton',
      header: '¿Seguro que desea eliminar?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'colorBoton',
        }, {
          text: 'SI',
          cssClass: 'colorBoton',
          handler: () => {
            this.deseosService.borrarLista(lista);
          }
        }
      ]
    });

    await alert.present();
  }

  async editarLista(lista: Lista) {

      const alert = await this.alertController.create({
      cssClass: 'colorBoton',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'colorBoton',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          cssClass: 'colorBoton',
          handler: (data) => {
            if (data.titulo.lenght === 0) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

      alert.present();
  }

}
