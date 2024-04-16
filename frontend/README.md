Области хранения данных:

база данных на json-server;
redux-store для хранения состояния приложения;
localStorage для хранения списка товаров в корзине и хеша сессии.
Сущности приложения:

пользователь: хранение в БД (список пользователей), redux-store (отображение в браузере), 
роль пользователя: БД (список ролей), redux-store (использование в логике);
товар: БД (список товара), redux-store (отображение в браузере);
категории: БД (категории товара), redux-store (отображение в браузере);
отзывы: БД (список комментариев), redux-store (отображение в браузере);
Корзина: БД (список товаров в корзине), localStorage  (отображение в браузере);
сессия пользователя: БД (список сессий пользователей), localStorage (хранение хеша)
Таблицы БД:

пользователи - users: { id, login, password, registed_at, role_id }
роли: - roles: { id, name }
категории - category: { id, name}
отзывы - comments: { id, author_id, product_id, content, published_at, grade }
товар - product: { id, title, description, img_url, grade, price, category }
сессия - session {id, hash, user}

сессия текущего пользователя: login / password / role
Схема для redux-store (на клиенте)

sessions: массив session: id / hash / user
categories: массив category: id / title /
products: массив product: id / title / description / imgUrl / grade / price / category / 
comments: массив comment: id / author / content / publishedAt
users: массив user: id / login / registeredAt / role