#![allow(unused)] // TODO: remove this line when you are done

use std::net::UdpSocket;

use crate::prelude::*;

mod error;
mod prelude;
mod utils;

fn main() -> Result<()> {
    let socket = UdpSocket::bind("localhost:4000").unwrap();
    let mut buffer: [u8; 1024] = [0; 1024];
    println!("Server is listening on {}", socket.local_addr().unwrap());

    loop {
        let (size, src) = socket.recv_from(&mut buffer).unwrap();
        let request = String::from_utf8_lossy(&buffer[..size]);

        println!("Received request: {}", request);
        println!("Received {} bytes from {}", size, src);

        let response = ("Hello");

        // Echo the data back to the sender
        socket.send_to(response.as_bytes(), src).unwrap();
    }

    Ok(())
}
