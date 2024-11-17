def gcd_three(a, b, c):
    gcd_ab = gcd(a, b)
    return gcd(gcd_ab, c)

def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


t=int(input())

list=[]

for i in range(t):
     T, C, Ch = map(int, input().split())
     list.append([T,C,Ch])

        
     
for row in list:
    a=row[0]
    b=row[1]
    c=row[2]
    
    print(gcd_three(a,b,c))  
    
    