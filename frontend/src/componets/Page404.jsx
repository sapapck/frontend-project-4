import page404 from "../img/page404.jpg"
import { Header } from "./Head";

const P404 = () => ( 
<Header>
    <div class="text-center">
      <img alt="Страница не найдена" src={page404}></img>
      <h1 class="text-muted">Страница не найдена</h1>
      <p class="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
    </div>
</Header>
  )
  export default P404;