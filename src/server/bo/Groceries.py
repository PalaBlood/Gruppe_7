from server.bo import BusinessObject as bo


class Groceries(bo.BusinessObject):
    def __init__(self) -> None:
        super().__init__()
        pass

tomato = Groceries()



if __name__ == "__main__":
    tomato.set_id(1)

    print(tomato.get_id())