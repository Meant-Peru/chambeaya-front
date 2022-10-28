import * as React from 'react';

import Header from '../components/shared/header';
import { useNavigate } from 'react-router-dom';
import {Txtfield, BtnPrimary, BtnSecondary, Span} from './../components/shared/styled';
import Modal from 'react-modal';

import './../sass/pages/_login.scss';

import { useAuth } from '../hooks/useAuth';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '24px',
    },
};

export default function Politicas() {


    return (
        <React.Fragment>
            <Header />
            <section className="Policies">
                <h1 id="pol-tica-de-privacidad">POLÍTICA DE PRIVACIDAD</h1><br />
                <h2 id="1-compromiso-con-la-privacidad">1. COMPROMISO CON LA PRIVACIDAD</h2><br/>
                <p>Las empresa Mang Corp S.A. respeta la privacidad de toda persona que visite el sitio web enunciado en la <a href="https://www.bumeran.com.pe/empresas/politicasDePrivacidad">cláusula 12</a> (en adelante, la &quot;Plataforma&quot;).
                    Esta Política de Privacidad indica la información que Mang Corp S.A. puede recopilar y el uso que puede dar a esa información. También explica las medidas de seguridad tomadas para proteger su información, su posibilidad de acceder a su información, y a quién podrá contactar en Mang Corp S.A. para que sus preguntas en relación con esta Política de Privacidad sean contestadas.</p><br />
                <h2 id="2-recopilaci-n-y-utilizaci-n-de-su-informaci-n">2. RECOPILACIÓN Y UTILIZACIÓN DE SU INFORMACIÓN</h2><br />
                <p>2.1. Esta Política de Privacidad contempla la recopilación y uso de información personal en el Sitio Web.</p><br />
                <p>2.2. Mang Corp no recopilará a través de la Plataforma ninguna información sobre usted que pueda identificarlo personalmente, como, por ejemplo, su nombre, dirección, número de teléfono o dirección de correo electrónico (en adelante, la &quot; Información Personal &quot;), a menos que usted nos la brinde en forma voluntaria. Si usted no desea que recopilemos su Información Personal, por favor absténgase de proporcionarla. Sin embargo, deberá tener en cuenta que en caso de no proporcionarnos su Información Personal, no podrá acceder a los servicios e información disponibles a través de la Plataforma.</p><br />
                <p>2.3. En caso de que usted nos brinde Información Personal, le comunicamos que esa Información Personal será objeto de tratamiento automatizado e incorporada a la base de datos de Mang Corp S.A.</p><br />
                <p>2.4. Mang Corp S.A. en ningún momento recopilará información sensible sobre usted.</p><br/>
                <h2 id="3-informaci-n-personal">3. INFORMACIÓN PERSONAL</h2><br/>
                <p>3.1. Mang Corp S.A. recopila Información Personal en línea cuando, entre otros casos:</p><br />
                <ul>
                    <li>Usted se registra para hacer uso de alguno de los servicios disponibles de la plataforma.</li>
                    <li>Usted utiliza la Plataforma.</li>
                    <li>Usted nos envía preguntas, consultas o comentarios o se contacta con la Plaforma.</li>
                    <li>Usted solicita información o materiales.</li>
                    <li>Usted provee de cualquier forma información a la plataforma(chats, foros, actualizaciones de estado, etc.).</li>
                </ul>
                <br />
                <p>3.2. Su Información Personal podrá ser tratada por Mang Corp S.A., sus empresas relacionadas y aliados comerciales directamente o a través de sus proveedores, para:</p><br />
                <ul>
                    <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de la compañía en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con usted.</li>
                    <li>Dar cumplimiento a obligaciones contraídas con usted.</li>
                    <li>Preparar, implementar, promocionar y ofrecer nuevos productos y servicios, o bien, nuevos atributos, modalidades o características a los productos y servicios que ya están a su disposición.</li>
                    <li>Ajustar la oferta de productos y servicios de Mang Corp S.A. y sus empresas relacionadas a su perfil de cliente, o bien, efectuar análisis, reportes y evaluaciones a su respecto.</li>
                    <li>Desarrollar acciones comerciales, de carácter general o dirigidas personalmente a usted, tendientes a mejorar su experiencia como usuario de la Plataforma.</li>
                    <li>Compartir la Información Personal a terceros a efectos de protección contra el fraude y la reducción de riesgo de crédito.</li>
                    <li>Transferir la Información Personal fuera o dentro del país a las empresas relacionadas para que estas puedan tratar su Información Personal de acuerdo a las finalidades consagradas en esta Política de Privacidad, de conformidad con las finalidades aquí señaladas.</li>
                </ul><br/>
                <p>3.3. El tipo de información recopilada puede incluir nombre, tipo y número de documento, teléfono, dirección de correo electrónico y/o cualquier otra información que permita individualizarlo. En todos los casos que usted brinde Información Personal, y de acuerdo a la legislación vigente, usted declara que la Información Personal brindada es correcta, cierta y actual.</p><br />
                <p>3.4. En los casos que nos brinde su Información Personal, usted acepta y presta su consentimiento libre, previo, expreso e informado para que dicha Información Personal sea utilizada con las finalidades arriba mencionadas y autoriza a que la misma sea tratada, almacenada, recopilada en la base de datos USUARIOS DE  LA PLATAFORMA propiedad de Mang Corp S.A., registrado mediante Resolución N° 3111-2016-JUS/DGPDP-DRN y código de inscripción RNPDP-PJP N° 11153. En tal sentido, usted autoriza a que su Información Personal sea compartida con los clientes de Mang Corp S.A., los cuales se encuentran a la vista en nuestra Plataforma, Asimismo, usted acepta y presta su consentimiento libre, previo, expreso e informado con los términos de la presente Política de Privacidad.</p><br />
                <h2 id="4-correo-electr-nico">4. CORREO ELECTRÓNICO</h2><br />
                <p>4.1. Mang Corp S.A. podrá enviarle correos electrónicos en relación con el contenido de la Plataforma, los servicios prestados por Mang Corp S.A. o sobre su cuenta y en respuesta a sus preguntas, pedidos, consultas o comentarios. Mang Corp S.A. también le podrá enviar correos electrónicos con información sobre productos y servicios ofrecidos por Mang Corp S.A. y/o terceros asociados comercialmente que le puedan resultar de interés, a menos que usted indique expresamente que no desea recibir dichos correos electrónicos a través de los procesos implementados por Mang Corp S.A. a tal efecto.</p><br />
                <p>4.2. Todo correo electrónico que reciba de Mang Corp S.A. le informará cómo rechazar el envío de futuros correos electrónicos promocionales. Asimismo, usted podrá cambiar sus preferencias de recepción de correos electrónicos publicitarios a través de la configuración de su cuenta en la propia Plataforma en cualquier momento.</p><br />
                <h2 id="5-otra-informaci-n-cookies">5. OTRA INFORMACIÓN - COOKIES</h2><br />
                <p>Cuando usted ingresa en la Plataforma podemos almacenar alguna información en su computadora bajo la forma de “Cookie” o archivo similar que puede sernos útil de varias formas. Con la mayoría de los exploradores para Internet, usted puede borrar las Cookies del disco rígido de su computadora, bloquear todas las Cookies o recibir un mensaje de alerta antes de que se almacene una Cookie. Por favor, consulta las instrucciones de su explorador para conocer más sobre estas funciones.</p><br />
                <h2 id="6-compartiendo-su-informaci-n">6. COMPARTIENDO SU INFORMACIÓN</h2><br />
                <p>La Información Personal que usted suministre será reputada y tratada como confidencial. Sin perjuicio de lo expuesto, Mang Corp S.A. podrá compartir total o parcialmente la Información Personal suministrada por usted, incluyendo registros de comportamiento y actividad en el Sitio, contactos a terceros que anuncien u ofrezcan productos o servicios en la Plataforma, parámetros de interés de búsquedas así como su historial de búsqueda y preferencias a empresas de Mang Corp S.A. (para conocer la empresa Mang Corp S.A. , ver: www.mangcorp.com ), así como entidades gubernamentales cuando nos requieran dicha información o se trate de una obligación legal. Asimismo, se hace transferencia internacional de datos a Google LLC, ubicada en Estados Unidos de América, para fines del servicio de hosting de nuestro Portal.</p><br />
                <p>Asimismo, en el evento de vender todo o parte del negocio de Mang Corp S.A., usted autoriza a Mang Corp S.A. a transferir al comprador las bases de datos que contiene su Información Personal. De ser el caso, se le comunicará de este hecho oportunamente.
                    Al margen de lo establecido en la presente Política de Privacidad, Mang Corp S.A no podrá vender o divulgar su Información Personal a terceros salvo que haya obtenido su consentimiento previamente o esté obligado a hacerlo por ley.</p><br />
                <p>Mang Corp S.A. será responsable del cumplimiento efectivo de las obligaciones referentes al tratamiento de Información Personal por sus empresas relacionadas, sin perjuicio de la responsabilidad que les quepa a éstas por cualquier incumplimiento de tales obligaciones. Del mismo modo, en caso que el tratamiento de Información Personal se haya de efectuar por empresas proveedoras de servicios para Mang Corp S.A., aliados comerciales o sus empresas relacionadas, dichas empresas deberán asumir compromisos de confidencialidad y adoptar medidas que aseguren el debido cumplimiento de las obligaciones establecidas en la Ley de Protección de Datos Personales- Ley No 29733 y su Reglamento Decreto Supremo N° 003-2013-JUS.</p><br />
                <h2 id="7-protegiendo-su-informaci-n-personal">7. PROTEGIENDO SU INFORMACIÓN PERSONAL</h2><br />
                <p>7.1. Para prevenir acceso no autorizado, mantener la precisión de los datos y asegurar el uso correcto de su Información Personal, Mang Corp S.A. ha puesto en uso ciertos medios físicos, electrónicos, administrativos y procedimientos de seguridad para resguardar y asegurar la Información Personal que recopilamos en línea. Nosotros resguardamos la Información Personal de acuerdo a estándares y procedimientos de seguridad establecidos y continuamente evaluamos nueva tecnología para proteger esa información. Mang Corp garantiza que los procesos internos propios de las bases de datos cumplen con las obligaciones legales de seguridad y confidencialidad impuestas por las leyes de cada país en materia de privacidad y protección de datos personales.</p><br />
                <p>7.2. A pesar de lo anterior, usted reconoce que los medios técnicos existentes que brindan seguridad no son inexpugnables y que aun cuando se adopten todos los recaudos razonables de seguridad es posible sufrir manipulaciones, destrucción y/o pérdida de información. De presentarse estos casos, Mang Corp S.A. procederá conforme las leyes de cada país en materia de privacidad y protección de datos lo requieran.</p><br />
                <p>7.3. Los empleados de Mang Corp S.A. son entrenados para comprender y cumplir con estos principios en materia de protección de datos personales y seguridad de la información. Asimismo, los empleados de Mang Corp S.A. asumen estrictos compromisos de confidencialidad en cuanto a la Información Personal que procesan en el ejercicio de sus funciones.</p><br />
                <p>7.4. Usted consiente, reconoce y acepta que su información personal sea almacenada en la jurisdicción de Mang Corp S.A. o que la misma pueda ser transferida, almacenada y tratada fuera de su país de residencia.</p><br />
                <h2 id="8-menores-de-edad">8. MENORES DE EDAD</h2><br />
                <p>8.1. Mang Corp S.A. no tiene intenciones de recopilar Información Personal de menores de edad. Cuando corresponda, Mang Corp. S.A. le indicará específicamente a los menores que no brinden esa información Personal en nuestra Plataforma y/o tomará medidas razonables para obtener el consentimiento de los padres, tutor o representante legal para la entrega de esa Información Personal.</p><br />
                <p>8.2. Le informamos que en su condición de padre, tutor legal o representante será el responsable de que sus hijos menores o bajo su tutela accedan a la Plataforma, por lo que recomendamos enfáticamente tomar las precauciones oportunas durante la navegación en la Plataforma A este fin, le informamos que algunos navegadores permiten configurarse para que los niños no puedan acceder a páginas determinadas.</p><br />
                <h2 id="9-links-externos">9. LINKS EXTERNOS</h2><br />
                <p>La Plataforma puede contener links hacia y provenientes de otros sitios de Internet. Mang Corp S.A. no es responsable por las prácticas de privacidad ni el tratamiento de los datos personales de esos sitios.</p>
                <h2 id="10-derechos-del-usuario">10. DERECHOS DEL USUARIO</h2><br />
                <p>10.1. Si usted ha proporcionado Información Personal a través de los servicios disponibles en la Plataforma, usted podrá acceder a la misma, revisar, modificar, eliminar y actualizar su Información Personal en el momento que lo desee.</p><br />
                <p>10.2. Si usted desea acceder a su Información Personal o si tal Información Personales es incorrecta, desactualizada y/o suprimida, por favor tenga a bien enviar su solicitud por correo electrónico de acuerdo con las normas implementadas en su país tal como se detalla en la cláusula 12 con el asunto “Informar”, “Rectificar”, “Suprimir” y/o “Actualizar” y/o cualquier otro según corresponda, conjuntamente con el objeto de su requerimiento. Dicha solicitud deberá contener como mínimo la siguiente información:</p><br />
                <ul>
                    <li>nombre y domicilio, a efecto de dar respuesta a su solicitud en los plazos establecidos en la ley aplicable;</li>
                    <li>copia de su documento de identidad, pasaporte o cualquier otro documento que acredite su identidad o acredite la personalidad de su representante legal, y en caso que la solicitud se realice a través del representante legal, acompañar el documento que acredita sus facultades como representante;</li>
                    <li>descripción clara y precisa de los datos personales sobre los que se busca ejercer alguno de los derechos antes mencionados de acceso, rectificación, oposición, cancelación o revocación, así como la descripción clara y precisa de su solicitud;</li>
                    <li>fecha y firma del solicitante; y</li>
                    <li>cualquier otro elemento o documento que facilite la localización de dichos datos personales.</li>
                </ul><br />
                <p>10.3. Asimismo, si usted se suscribe a alguno de los servicios o comunicaciones que ofrece Mang Corp S.A. podrá dar de baja su suscripción en cualquier momento siguiendo las instrucciones incluidas en cada comunicación.</p><br />
                <p>10.4. Mang Corp S.A. cooperará con las autoridades de cada país cuando éstas requieran formalmente cualquier información relacionada con nuestras bases de datos.</p><br />
                <h2 id="11-cambios-a-este-aviso-de-privacidad">11. CAMBIOS A ESTE AVISO DE PRIVACIDAD</h2><br />
                <p>Mang Corp S.A. se reserva el derecho a modificar esta Política de Privacidad periódicamente, en cuyo caso la política actualizada se publicará en este mismo sitio, siendo obligación de los usuarios revisar regularmente esta sección a fin de informarse de cualquier cambio que se pueda haber producido. De todos modos, Mang Corp S.A. cursará una comunicación a su cuenta de correo electrónico registrada a efectos de informarle sobre el cambio en la Política de Privacidad.</p><br />
                <h2 id="12-localizaci-n">12. LOCALIZACIÓN</h2><br />
                <p>12.1. PARA USUARIOS EN PERÚ</p><br/>
                <p>12.1.1. Mang Corp S.A. es dueña de la Marca Chambea Latam., con domicilio en AVENIDA BENAVIDES N° 786, INT. 1205, MIRAFLORES, LIMA PERÚ. La Plataforma es <a href="http://www.chambea-latam.com/">http://www.chambea-latam.com/</a> y Chambea Latam en Play Store. La presente Política de Privacidad se rige por las leyes de Perú.</p><br />
                <p>12.1.2. Usted como titular de la Información Personal, podrá en todo momento revocar el consentimiento otorgado expresamente, tanto como limitar el uso o divulgación de su Información Personal. A usted le asiste el ejercer los derechos de acceso, rectificación, oposición y cancelación de los datos personales, para lo cual puede dirigirse al correo electrónico o su representante, podrá presentar la solicitud de ejercicio de sus derechos reconocidos en la Ley 29733 Ley de protección a los datos personales, escribiendo a hola@chambea-latam.com.</p><br />
                <p>12.1.3. Usted tiene derecho a impedir que lo contactemos por teléfono para fines publicitarios o de prospección comercial inscribiéndose al Registro “Gracias No insista” del Instituto Nacional de Defensa de la Protección de la Propiedad Intelectual (INDECOPI). Para mayor información, consulta en <a href="http://sustems.Indecopi.gob.pe/noinsista/home.seam">http://sustems.Indecopi.gob.pe/noinsista/home.seam</a> o llame al (+511) 224-7777.</p><br />
                <p>12.1.4. En caso de que el usuario no reciba una respuesta satisfactoria al requerimiento de acceso, rectificación, actualización y/o supresión de su Información Personal, se le informa que la Dirección General de Protección de Datos Personales, Órgano de Control de la Ley de Protección de Datos Personales – Ley Nº 29733 y su Reglamento, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales. Puede acceder a mayor información haciendo clic en la imagen que sigue a continuación: <a href="https://www.minjus.gob.pe/proteccion-de-datos-personales/">https://www.minjus.gob.pe/proteccion-de-datos-personales/</a></p><br />
                <h2 id="13-contacto">13. CONTACTO</h2><br />
                <p>Si tiene preguntas sobre su privacidad cuando utilice el Sitio Web, por favor contáctenos a los siguientes correos electrónicos:
                    Perú: <a href="mailto:hola@chambea-latam.com">hola@chambea-latam.com</a>
                    Esta Política de Privacidad fue actualizada por última vez el 11 de Agosto de 2022.</p>
            </section>
        </React.Fragment>
    );
}