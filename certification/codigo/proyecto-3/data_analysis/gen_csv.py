import random

random.seed(11)
regions = ["Norte", "Sur", "Oriente", "Occidente", "Centro"]
products = [("P001", "Agua", 2.0), ("P002", "Galletas", 3.5),
            ("P003", "Jugo", 4.0), ("P004", "Cafe", 5.5),
            ("P005", "Snack", 3.0), ("P006", "Gaseosa", 4.5)]

with open("smart_retail_sales.csv", "w", encoding="utf-8") as f:
    f.write("date,machine_id,region,time,product_id,product_name,unit_price,quantity,total,status\n")
    for _ in range(60):
        day = random.randint(1, 28)
        machine = random.randint(1001, 1020)
        region = regions[machine % len(regions)]   # a machine always belongs to the same zone
        pid, name, price = random.choice(products)
        qty = random.randint(1, 4)
        hh, mm, ss = random.randint(7, 21), random.randint(0, 59), random.randint(0, 59)
        status = "Success" if random.random() < 0.8 else "Failed"
        f.write(f"2026-10-{day:02d},{machine},{region},{hh:02d}:{mm:02d}:{ss:02d},"
                f"{pid},{name},{price:.2f},{qty},{price*qty:.2f},{status}\n")