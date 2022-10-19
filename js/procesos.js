const  indexedDB = window.indexedDB;
const form = document.getElementById('form');
const carros = document.getElementById('carros');

if(indexedDB && form){
    let db;
    //creacion de la base de datos, lleva 1 ya que al no llevar ese parametro, por registro se crearía una base de datos diferente
    const request = indexedDB.open('datosCarros',1);
    request.onsuccess = ()=>{
        db = request.result;
        console.log('OPEN', db);
        readDatos();

    }
    request.onupgradeneeded = () =>{
        db = request.result;
        console.log('Create', db);
        //
        const almacenamiento = db.createObjectStore('datos',{
            autoIncrement: true
            //keyPath: 
        });
    }
    request.onerror = (error) =>{
        console.log('error', error)
    }
    const addDatos = (data) =>{
        const transaction = db.transaction(['datos'],'readwrite');
        const almacenamiento = transaction.objectStore('datos');
        const request = almacenamiento.add(data);
        readDatos();
    }

    const readDatos = () =>{
        const transaction = db.transaction(['datos'],'readonly');
        const almacenamiento = transaction.objectStore('datos');
        const request = almacenamiento.openCursor();
        const fragmento = document.createDocumentFragment();
        

        request.onsuccess = (e) =>{
            
            //console.log(e.target);
            const cursor = e.target.result;
            if(cursor){
                //console.log(cursor.value);
                const nombres = document.createElement('p');
                nombres.textContent = cursor.value.nombres;
                fragmento.appendChild(nombres);

                const duis = document.createElement('p');
                duis.textContent = cursor.value.duis;
                fragmento.appendChild(duis);

                const nits = document.createElement('p');
                nits.textContent = cursor.value.nits;
                fragmento.appendChild(nits);

                const marcas = document.createElement('p');
                marcas.textContent = cursor.value.marcas;
                fragmento.appendChild(marcas);

                const modelos = document.createElement('p');
                modelos.textContent = cursor.value.modelos;
                fragmento.appendChild(modelos);

                const colores = document.createElement('p');
                colores.textContent = cursor.value.colores;
                fragmento.appendChild(colores);

                const anios = document.createElement('p');
                anios.textContent = cursor.value.anios;
                fragmento.appendChild(anios);

                const placas = document.createElement('p');
                placas.textContent = cursor.value.placas;
                fragmento.appendChild(placas);

                const fallos = document.createElement('p');
                fallos.textContent = cursor.value.fallos;
                fragmento.appendChild(fallos);


                cursor.continue();
                
            }else{
                //console.log("No hay mas personas");
                carros.textContent = '';
                carros.appendChild(fragmento);
                /*console.dir(fragmento);*/
                
            }
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        var valdui = numdu.value;
        var valnit = nit.value;

        if(valdui.length > 0){
            var duiEXP = /^[0-9]{8}-[0-9]{1}$/;
            var resultado = duiEXP.test(valdui);
            //resultado == true;
        }/*else{
            alert("Su número de DUI debe estar en el formato ########-#");
        }*/
        /*if(valnit >0){
            var nitR = EXPnit.test(valnit);
        }*/


            if(resultado == true){
                const data = {
                    marcas:e.target.marca.value,
                    modelos:e.target.modelo.value,
                    colores:e.target.color.value,
                    nombres:e.target.nombre.value, 
                    duis: e.target.numdu.value,
                    nits: e.target.nit.value,
                    anios: e.target.anio.value,
                    fallos: e.target.fallo.value,
                    placas: e.target.placa.value
                    
                }
                addDatos(data);

            }
        
       
    })

    
    
}
