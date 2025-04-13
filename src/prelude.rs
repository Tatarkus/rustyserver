//! Crate Prelude

pub use crate::error::Error;

pub type Result<T> = core::result::Result<T, Error>;

// Generic wrapper newtype pattern
pub struct W<T>(pub T);