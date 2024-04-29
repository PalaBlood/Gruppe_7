from BusinessObject import BusinessObject


class Groceries(BusinessObject):
    def __init__(self) -> None:
        super().__init__()
        pass

tomato = Groceries()



if __name__ == "__main__":
    tomato.set_id(1)

    print(tomato.get_id())