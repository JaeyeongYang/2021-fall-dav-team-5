# Backend API server

* Python 3.8 or above + Django + DjangoRestFramework + SQLite

## Getting started

1. Install Python 3.8 or above.
2. Install poetry to handle the virtual environment (https://python-poetry.org).
3. Install the virtual environment with `poetry install`.
4. Activate the virtual environment with `poetry shell`
5. Make a database file with `python manage.py migrate`
6. Run the server with `python manage.py runserver` and go to `localhost:8000`.

## API endpoints

### `/menus/`

* **Return**: a list of menus with following fields:
  * `id` (integer): 메뉴 id
  * `name` (string): 메뉴명
  * `way` (string): 조리방법
  * `pat` (string): 조리종류
  * `energy` (number): 열량
  * `carb` (number): 탄수화물
  * `protein` (number): 단백질
  * `fat` (number): 지방
  * `na` (number): 나트륨
  * `hashtag` (string): 해시태그
  * `url_small` (string): 이미지경로(소)
  * `url_large` (string): 이미지경로(대)
* **Query parameters**
  * `name`: 메뉴명
  * `way`: 조리방법
  * `pat`: 조리종류
  * `energy_min`: 열량 최솟값 (gte)
  * `energy_max`: 열량 최댓값 (lte)
  * `carb_min`: 탄수화물 최솟값 (gte)
  * `carb_max`: 탄수화물 최댓값 (lte)
  * `protein_min`: 단백질 최솟값 (gte)
  * `protein_max`: 단백질 최댓값 (lte)
  * `fat_min`: 지방 최솟값 (gte)
  * `fat_max`: 지방 최댓값 (lte)
  * `na_min`: 나트륨 최솟값 (gte)
  * `na_max`: 나트륨 최댓값 (lte)
  * `hashtag`: 해시태그
  * `ingredients`: 재료 (`,`로 구분하여 여러 개 전달 가능)
* **Example**
  * `/menus/?name=치킨&energy_min=300&ingredients=밥,샐러드`

### `/menus/<id>/`

* **Return**: details for the given menu with following fields:
  * `id` (integer): 메뉴 id
  * `name` (string): 메뉴명
  * `way` (string): 조리방법
  * `pat` (string): 조리종류
  * `energy` (number): 열량
  * `carb` (number): 탄수화물
  * `protein` (number): 단백질
  * `fat` (number): 지방
  * `na` (number): 나트륨
  * `hashtag` (string): 해시태그
  * `url_small` (string): 이미지경로(소)
  * `url_large` (string): 이미지경로(대)
  * `ingredients` (string): 재료
  * `recipes` (list of objects): 조리방법
    * `order` (integer): 조리순서
    * `text` (text): 조리방법
    * `img` (string): 이미지경로
* **Example**
  * `/menus/1/`

### `/options/`

Return distinct options and corresponding counts for some fields of menus.

* **Return**:
  * `way` (tuple of <string, integer>): 조리방법
  * `pat` (tuple of <string, integer>): 조리종류
  * `hashtag` (tuple of <string, integer>): 해시태그
