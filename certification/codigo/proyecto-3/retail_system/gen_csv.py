import random

random.seed(11)
regions = ["Norte", "Sur", "Oriente", "Occidente", "Centro"]
products = [("P001", "Agua", 2.0), ("P002", "Galletas", 3.5),
            ("P003", "Jugo", 4.0), ("P004", "Cafe", 5.5),
            ("P005", "Snack", 3.0), ("P006", "Gaseosa", 4.5)]

lines = []
for _ in range(100):
    year = random.choice([2025, 2026])
    month = random.randint(6, 11)
    day = random.randint(1, 28)
    machine = random.randint(1001, 1020)
    region = regions[machine % len(regions)]
    pid, name, price = random.choice(products)
    qty = random.randint(1, 4)
    hh, mm, ss = random.randint(7, 21), random.randint(0, 59), random.randint(0, 59)
    status = "Success" if random.random() < 0.8 else "Failed"
    lines.append(f"{year}-{month:02d}-{day:02d},{machine},{region},{hh:02d}:{mm:02d}:{ss:02d},"
                 f"{pid},{name},{price:.2f},{qty},{price*qty:.2f},{status}")

# rows with problems to exercise the cleaning module
lines.append(lines[3])    # duplicate
lines.append(lines[17])   # duplicate
for idx, col in [(5, 2), (9, 5), (12, 7)]:
    parts = lines[idx].split(",")
    parts[col] = ""       # empty region / product name / quantity
    lines.append(",".join(parts))

with open("smart_retail_sales.csv", "w", encoding="utf-8") as f:
    f.write("date,machine_id,region,time,product_id,product_name,unit_price,quantity,total,status\n")
    f.write("\n".join(lines) + "\n")
